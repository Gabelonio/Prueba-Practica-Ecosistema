from django.db import models
from beneficiarios.models import Beneficiario

# Create your models here.
class Chaleco(models.Model):
    serial = models.IntegerField(primary_key=True)
    beneficiario_cedula = models.ForeignKey(Beneficiario, on_delete=models.CASCADE, db_column="beneficiario_cedula")
    class Meta:
            db_table = "chalecos"