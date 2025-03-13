import json
from .models import Chaleco
from beneficiarios.models import Beneficiario
from django.db import IntegrityError
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from gestion_datos_prueba.middlewares import CheckUserTokenMiddleware

#Obtener el token del usuario
def token_required(view_func):
    def wrapped_view(request, *args, **kwargs):
        middleware = CheckUserTokenMiddleware(lambda req: view_func(req, *args, **kwargs))
        return middleware(request)
    return wrapped_view

# Create your views here.
@csrf_exempt
# Obtener la lista de todos los chalecos
@api_view(['GET'])
@token_required
def get_lista_chalecos(request):
    chalecos = Chaleco.objects.select_related('beneficiario_cedula').all()
    joined_data = [
        {
            'serial': chaleco.serial,
            'beneficiario_cedula': chaleco.beneficiario_cedula.cedula,
            'beneficiario_nombre': chaleco.beneficiario_cedula.nombre
        }
        for chaleco in chalecos
    ]
    return JsonResponse(joined_data, safe=False, status = 200)

# Crear un nuevo chaleco
@api_view(['POST'])
@token_required
def create_chaleco(request):
    try :
        chaleco_data = json.loads(request.body)
        
        required_fields = ['serial', 'beneficiario_cedula']
        if not all(field in chaleco_data for field in required_fields):
            return JsonResponse({'message': 'Hay campos faltanates en el registro de este chaleco'}, status=400)
        
        try:
            beneficiario = Beneficiario.objects.get(cedula=chaleco_data['beneficiario_cedula'])
        except Beneficiario.DoesNotExist:
            return JsonResponse({'message': 'El beneficiario con esta cédula no existe'}, status=404)
        
        Chaleco.objects.create(
            serial= chaleco_data['serial'], 
            beneficiario_cedula= beneficiario  
        )
        return JsonResponse({'message': 'Chaleco creado exitosamente' }, status=201)
    except IntegrityError:
        return JsonResponse({'message': 'El serial de este chaleco ya existe'}, status=409)
    except json.JSONDecodeError:
            return JsonResponse({'message': 'Formato JSON no válido'}, status=400)
    except Exception as e :
        return JsonResponse({'message': 'Error al crear chaleco . SERVER ERROR : '  + str(e) }, status=500)    
