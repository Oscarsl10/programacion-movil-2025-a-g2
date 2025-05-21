## Documentación del Diagrama de Casos de Uso – Sistema CaffeNet
### Nombre del sistema:
CaffeNet – Sistema de gestión de pedidos y reservas para un café.

## Actores
### Actor	Descripción
- Cliente:	Usuario registrado que puede realizar reservas, pedidos, pagos y ver productos.
- Invitado:	Usuario no registrado que solo puede ver el menú y productos.
- Admin:	Administrador del sistema con privilegios para gestionar inventario, usuarios y reportes.

## Casos de uso principales
### Caso de Uso	Actor(es)	Descripción
- Registrarse	Cliente	Permite a un nuevo cliente crear una cuenta en el sistema.
- Login	Cliente	Permite a un cliente autenticarse en el sistema.

- Ver productos	Cliente, Invitado	Permite visualizar el catálogo de productos disponibles.
- Ver menú	Invitado	Muestra el menú general del café.
- Reserva	Cliente	Permite crear una reserva de mesa.
- Editar reserva	Cliente	Permite modificar una reserva existente. (Extiende a: Reserva)
- Confirmar reserva	Cliente	Finaliza la reserva creada. (Incluye a: Reserva)
- Cancelar reserva	Cliente	Elimina o desactiva una reserva. (Extiende a: Reserva)
- Pedido	Cliente	Permite realizar una orden de productos. (Incluye a: Ver productos)
- Realizar pago	Cliente	Permite pagar por un pedido realizado. (Incluye a: Pedido)
- LoginAdmin	Admin	Permite que el administrador acceda al sistema con privilegios.
- Gestionar inventario	Admin	Administra los productos disponibles en el sistema. (Asociado a: LoginAdmin)
- Gestión de usuarios	Admin	Permite visualizar, agregar, editar o eliminar usuarios. (Asociado a: Gestionar inventario)
- Generación de reportes	Admin	Genera reportes de ventas, reservas o actividades. (Extiende a: Pedido)

## Relaciones Entre Casos de Uso
- <<include>>: El caso de uso siempre llama al otro como parte de su ejecución.

- reserva incluye a confirmar reserva

- pedido incluye a ver productos

- realizar pago incluye a pedido

- <<extend>>: El caso de uso puede extender la funcionalidad de otro en situaciones específicas.

- editar reserva extiende a reserva

- cancelar reserva extiende a reserva

- generación de reportes extiende a pedido

## Resumen de funcionalidades por actor
### Cliente
- Registrarse

- Login

- Ver productos

- Realizar reservas (crear, editar, confirmar, cancelar)

- Hacer pedidos

- Realizar pagos

### Invitado
- Ver menú

- Ver productos

### Admin
- Login (Admin)

- Gestionar inventario

- Gestionar usuarios

- Generar reportes

## Recomendaciones para Implementación
Autenticación diferenciada para cliente y admin.

Control de accesos según actor para proteger funcionalidades.

Validación de datos al realizar reservas, pedidos y pagos.

Auditoría y logs para generación de reportes y trazabilidad de operaciones.

## Imagen

![caso de uso](img/Diagrama%20caso%20de%20uso%20CaffeNet.png)