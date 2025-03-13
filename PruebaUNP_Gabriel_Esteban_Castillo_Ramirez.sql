-- Database: PruebaUNP_Gabriel_Esteban_Castillo_Ramirez
DROP DATABASE IF EXISTS "PruebaUNP_Gabriel_Esteban_Castillo_Ramirez";

CREATE DATABASE "PruebaUNP_Gabriel_Esteban_Castillo_Ramirez"
     WITH
     OWNER = postgres
     ENCODING = 'UTF8'
     LC_COLLATE = 'Spanish_Colombia.1252'
     LC_CTYPE = 'Spanish_Colombia.1252'
     TABLESPACE = pg_default
     CONNECTION LIMIT = -1
     IS_TEMPLATE = False;

\c "PruebaUNP_Gabriel_Esteban_Castillo_Ramirez"

DROP TABLE IF EXISTS Chalecos CASCADE;
DROP TABLE IF EXISTS Beneficiarios CASCADE;
DROP TABLE IF EXISTS Usuarios CASCADE;

CREATE TABLE Usuarios (
  	id SERIAL PRIMARY KEY,
	nombreUsuario VARCHAR(255) UNIQUE NOT NULL,
	contraseña VARCHAR(255) NOT NULL
);
CREATE TABLE Beneficiarios (
	cedula INT PRIMARY KEY,
	nombre VARCHAR(255),
	direccion VARCHAR(255),
	poblacion VARCHAR(100)
); 
CREATE TABLE Chalecos (
	serial INT PRIMARY KEY,
	beneficiario_cedula INT REFERENCES Beneficiarios(cedula) ON DELETE CASCADE
)
