# Database - App CaffeNet

## Descripción
Este proyecto contiene la configuración y los scripts necesarios para gestionar la base de datos de la aplicación móvil CaffeNet.

## Tecnologías
- Mysql
- Docker

## Instalación
1. Instalar Docker siguiendo las instrucciones oficiales: [Docker Installation](https://docs.docker.com/engine/install/)
2. Instalar Mysql siguiendo las instrucciones oficiales: [Mysql Installation](https://dev.mysql.com/downloads/installer/)

## Preparar los Archivos

1. Coloque los archivos 

 ```bash
 .env, Dockerfile y docker-compose.yml en el mismo directorio.
 ```

2. Construir la Imagen

 - Utilice el siguiente comando para construir la imagen a partir del Dockerfile:

    ```bash
    docker build -t custom-mysql .
    ```

3. Levantar el Contenedor

 - Si desea actualizar la configuración o reconstruir la imagen, primero detenga el contenedor con el siguiente comando:

 ```bash
docker-compose down
```
 - Luego, levante el contenedor y reconstruya la imagen utilizando:

 ```bash
docker-compose up -d --build
```

4. Acceso a MySQL

 -Después de que el contenedor esté en ejecución, puede acceder a MySQL utilizando el cliente MySQL o cualquier otra herramienta de administración de bases de datos compatible.

## Crear base de datos
1. Crear una base de datos llamada `CaffeNet`:


## Estructura de la Base de Datos
- **Productos**: Contiene la información de los productos disponibles.
- **Pedidos**: Contiene la información de los pedidos realizados por los usuarios.
- **Pago**: Contiene los pagos registrados.
- **Detalle Pedidos**: Contiene el detalle de los pedidos.
- **Comprobante**: Contiene el comprobante de la compra.
- **Reserva**: Contiene las reservas registradas.


## Licencia
Este proyecto está bajo la Licencia MIT.