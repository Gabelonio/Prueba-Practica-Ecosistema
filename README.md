## Acerca 

Este proyecto fue desarrollado siguiendo los requisitos del desafío técnico de Prueba Practica Ecosistema

## Menu
- [Features](#features)  
- [How It Works](#how-it-works)  
- [Screenshots](#screenshots)  

## Features

- [ ] El Usuario tendra la posibilidad de 
  - [x] Iniciar Sesion con las credenciales de gabriel123 y clave_segura1 respectivamente.
  - [x] Consultar e Ingresar nuevos registros en Beneficiarios.
  - [x] Consultar e Ingresar nuevos chalecos en Chalecos.
  - [x] Buscar Beneficiarios por Nombre o por Cedula para sus Chalecos

---

## How it works

El proyecto se centra en un Backend y un Frontend basados en Django y React respectivamente.

El Backend se conecta a una base de datos en el ambiente local. Seguido de esto será capaz de realizar consultas de 
inicio de sesión a partir de la consulta de la tabla Usuarios estructurada previamente en la base de datos.

Asimismo, se crean dos aplicaciones adicionales, una para cada tabla, en donde se ubican los diferentes Endpoints de 
consulta e inserción, protegiendo estas rutas a través de la presencia del header (User-Token), la cuál se envía desde 
el frontend por medio de Headers. 

Por otra parte, el Frontend se estructura de pages, componentes y servicios y se engloba en un Router proporcionado por los recursos del
repositorio compartido https://github.com/EcosistemaUNP/react-ecosistema-unp

Asimismo se adoptan ciertos colores del sitio como indicado. Adicionalmente se protegen las rutas nuevamente usando el 

localStorage en donde se ubican los tokens generados por Backend para interactuar con el mismo.
A continuación se observan capturas de pantalla del procedimiento.

## Screenshots

![image](https://github.com/user-attachments/assets/add6b377-8c0a-47ad-84ac-c01448cdaaac)
![image](https://github.com/user-attachments/assets/57a75232-bf9b-4bd0-86ac-89d78e8082f8)
![image](https://github.com/user-attachments/assets/fc6a0a91-b9ca-4811-bc4a-152c23968888)
![image](https://github.com/user-attachments/assets/0ed13b65-efbc-46f5-8f9e-450962e0c37b)
![image](https://github.com/user-attachments/assets/7a84531d-a773-4d0e-9a59-9eeb3bfe31c2)
![image](https://github.com/user-attachments/assets/8ed7dd27-e11f-4cea-be66-2cd02ae5d920)
![image](https://github.com/user-attachments/assets/b1be3e9b-f399-4b42-b9b5-cc07df008659)


## Variables de entorno
para el Frontend se usan las variables
REACT_APP_API_BASE_URL='http://127.0.0.1:8000'

para el Backend se usan las variables
SECRET_KEY_DJANGO='secretounp'



