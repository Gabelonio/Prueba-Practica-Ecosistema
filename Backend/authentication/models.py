from django.db import models

class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    nombreusuario = models.CharField(max_length=255, unique=True)
    contraseña = models.CharField(max_length=255) 
    class Meta:
        db_table = "usuarios"