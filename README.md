# Sistema BookLend

Este proyecto es un sistema de gestión para una biblioteca que permite realizar las siguientes operaciones:

- Alta, baja y modificación de libros.
- Gestión de socios (alta, baja, modificación y visualización).
- Gestión de préstamos de libros a socios.
- Administración de usuarios con roles y autenticación.

## Tecnologías Utilizadas

- **Backend**: NestJS (Node.js)
- **Frontend**: Angular
- **Base de Datos**: PostgreSQL (o cualquier base de datos SQL)
- **Autenticación**: JWT (JSON Web Tokens)
- **Interfaz de Usuario**: Angular Material

## Requisitos

Antes de ejecutar este proyecto, asegúrate de tener instalados los siguientes programas:

- Node.js (versión >= 14)
- Angular CLI (versión >= 12)
- PostgreSQL (o el sistema de base de datos que prefieras)

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/SantyPrado01/Sistema-Biblioteca
   ```
2. Configurar el backend:
   - Ingresar a la carpeta `backend`.
   - Instalar las dependencias:
     ```bash
     npm install
     ```
   - Configurar el archivo `.env` con las credenciales de la base de datos.
   - Iniciar el servidor:
     ```bash
     npm run start
     ```
3. Configurar el frontend:
   - Ingresar a la carpeta `frontend`.
   - Instalar las dependencias:
     ```bash
     npm install
     ```
   - Iniciar el servidor:
     ```bash
     ng serve
     ```
## Uso

1. Ingresar al sistema mediante el formulario de login.
2. Navegar a través de la barra de navegación para gestionar socios, libros, prestamos, y usuarios.
3. Visualizar, filtrar y editar información según sea necesario.

## Estado del Proyecto

El proyecto del sistema de gestión de la biblioteca se desarrolló inicialmente como un proyecto educativo para aplicar conocimientos en Angular, NestJS y SQL. Aunque comenzó con funcionalidades básicas como la gestión de libros y socios, sigue en desarrollo, con planes para agregar nuevas características y mejorar la experiencia del usuario de manera continua.

## Contribuciones

Las contribuciones son bienvenidas. Para colaborar:

1. Realiza un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección de errores:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y confirma los commits.
4. Envía un pull request.

## Autor

Santiago Prado
