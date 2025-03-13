from django.db import models

# Create your models here.
class Beneficiario(models.Model):
    cedula = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    poblacion = models.CharField(max_length=100)
    class Meta:
            db_table = "beneficiarios"