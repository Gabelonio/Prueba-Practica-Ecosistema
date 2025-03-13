from django.urls import path
from . import views

urlpatterns = [
    path('all-chalecos', views.get_lista_chalecos, name='listar_chalecos'),
    path('add', views.create_chaleco, name='create_chaleco'),
]