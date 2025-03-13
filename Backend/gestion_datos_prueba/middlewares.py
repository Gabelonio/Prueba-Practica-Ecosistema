import jwt
import os
from dotenv import load_dotenv
from django.http import JsonResponse
from authentication.models import Usuario

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY_DJANGO")

class CheckUserTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user_token = request.headers.get('User-Token')

        if not user_token:
            return JsonResponse({'message': 'Acceso no autorizado, no hay Token de Usuario'}, status=403)

        try:
            decoded_data = jwt.decode(user_token, SECRET_KEY, algorithms=["HS256"])
            nombreusuario = decoded_data.get("user")

            if not Usuario.objects.filter(nombreusuario=nombreusuario).exists():
                return JsonResponse({'message': 'Acceso no autorizado, usuario inválido'}, status=403)

        except jwt.ExpiredSignatureError:
            return JsonResponse({'message': 'Token expirado'}, status=403)
        except jwt.InvalidTokenError:
            return JsonResponse({'message': 'Token inválido'}, status=403)

        return self.get_response(request)