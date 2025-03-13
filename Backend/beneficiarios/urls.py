from django.urls import path
from . import views

urlpatterns = [
    path('all-beneficiarios', views.get_lista_beneficiarios, name='listar_beneficiarios'),
    path('all-beneficiarios-opciones', views.get_lista_beneficiarios_opciones, name='listar_beneficiarios_opciones'),
    path('search/cedula/<int:cedula>/', views.get_beneficiario_by_cedula, name='filtrar_beneficiario_cedula'),
    path('search/name/<str:nombre>/', views.get_beneficiarios_by_nombre, name='filtrar_beneficiarios_nombre'),
    path('add', views.create_beneficiario, name='create_beneficiario'),
]