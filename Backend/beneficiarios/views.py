import json
from .models import Beneficiario
from django.db import IntegrityError
from django.db.models import Count, Q
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from gestion_datos_prueba.middlewares import CheckUserTokenMiddleware

#Obtener el token del usuario
def token_required(view_func):
    def wrapped_view(request, *args, **kwargs):
        middleware = CheckUserTokenMiddleware(lambda req: view_func(req, *args, **kwargs))
        return middleware(request)
    return wrapped_view

# Obtener la lista de todos los beneficiarios
@csrf_exempt
@api_view(['GET'])
@token_required
def get_lista_beneficiarios(request):
    beneficiarios = Beneficiario.objects.all()
    return JsonResponse(list(beneficiarios.values()), safe=False, status = 200)

# Obtener la lista de beneficiarios simplificada
@api_view(['GET'])
@token_required
def get_lista_beneficiarios_opciones(request):
    beneficiarios = Beneficiario.objects.values('cedula', 'nombre')
    return JsonResponse(list(beneficiarios), safe=False, status=200)

# Obtener el beneficiario por cedula
@api_view(['GET'])
@token_required
def get_beneficiario_by_cedula(request, cedula):
    try:
        beneficiario = Beneficiario.objects.annotate(
            total_chalecos=Count('chaleco')
        ).get(cedula=cedula)

        data = {
            'cedula': beneficiario.cedula,
            'nombre': beneficiario.nombre,
            'direccion': beneficiario.direccion,
            'poblacion': beneficiario.poblacion,
            'total_chalecos': beneficiario.total_chalecos
        }
        return JsonResponse(data, status=200)
    except Beneficiario.DoesNotExist:
        return JsonResponse({'message': 'Beneficiario no encontrado'}, status=404)
    
# Obtener beneficiarios por nombre
@api_view(['GET'])
@token_required
def get_beneficiarios_by_nombre(request, nombre):
    beneficiarios = Beneficiario.objects.filter(
        Q(nombre__icontains=nombre)
    ).annotate(
        total_chalecos=Count('chaleco')
    ).values('cedula', 'nombre', 'direccion', 'poblacion' , 'total_chalecos')

    if not beneficiarios:
        return JsonResponse({'message': 'No se encontraron beneficiarios'}, status=404)

    return JsonResponse(list(beneficiarios), safe=False, status=200)

# Crear un nuevo beneficiario
@api_view(['POST'])
@token_required
def create_beneficiario(request):
    try :
        beneficiario_data = json.loads(request.body)
        
        if not beneficiario_data.get('cedula'):
            return JsonResponse({'message': 'La cédula del beneficiario es requerida'}, status=400)
        
        Beneficiario.objects.create(
            cedula= beneficiario_data['cedula'], 
            nombre= beneficiario_data['nombre'], 
            direccion= beneficiario_data['direccion'], 
            poblacion= beneficiario_data['poblacion']
        )
        return JsonResponse({'message': 'Beneficiario creado exitosamente' }, status=201)
    except IntegrityError:
        return JsonResponse({'message': 'La cédula del beneficiario ya existe'}, status=409)
    except json.JSONDecodeError:
            return JsonResponse({'message': 'Formato JSON no válido'}, status=400)
    except Exception as e :
        return JsonResponse({'message': 'Error al crear beneficiario . SERVER ERROR : '  + str(e) }, status=500)    
