import os
import jwt
import datetime
import json
from dotenv import load_dotenv
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .models import Usuario

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY_DJANGO")

# Generacion de Token
def generar_token(datos, exp_min=30):
    datos["exp"] = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=exp_min)
    return jwt.encode(datos, SECRET_KEY, algorithm="HS256")

# Realizacion de login
@csrf_exempt
@api_view(['POST'])
def login_view(request):
    try:
        data = json.loads(request.body)
        nombreusuario = data.get("nombre_usuario")
        contraseña = data.get("contraseña")

        usuario = Usuario.objects.filter(nombreusuario=nombreusuario, contraseña=contraseña).first()

        if usuario:
            # Generar Token de acceso, tiempo de expiracion una hora
            access_token = generar_token({"nombreusuario": usuario.nombreusuario}, exp_min=60)
            user_token = jwt.encode({"user": usuario.nombreusuario}, SECRET_KEY, algorithm="HS256")

            return JsonResponse({
                "access_token": access_token,
                "user_token": user_token
            })
        else:
            return JsonResponse({"error": "Credenciales incorrectas"}, status=401)
    except Exception as e :
        return JsonResponse({'message': 'Error al realizar login . SERVER ERROR : '  + str(e) }, status=500)   

#Logout
@api_view(['POST'])
def logout_view(request):
    return JsonResponse({"message": "Logout exitoso"}, status=200)