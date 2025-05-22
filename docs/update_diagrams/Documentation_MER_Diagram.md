#  Modelo Entidad-Relación - Sistema CaffeNet

##  Entidades y Atributos

### 1. `usuario`
Representa a los usuarios del sistema (clientes, empleados u otros).

- **email**: `PK`, correo electrónico del usuario (identificador único).
- **password**: contraseña para acceder al sistema.
- **full_name**: nombre completo del usuario.
- **telefono**: número de contacto del usuario.

---
### 2. `admin`
Representa a los administradores del sistema, con permisos especiales.

- **email**: `PK`, correo electrónico del administrador (único).
- **password**: contraseña del administrador.
- **full_name**: nombre completo del administrador.

### 3. `reserva`
Representa una reserva hecha por un usuario para ocupar una mesa.

- **id**: `PK`, identificador único de la reserva.
- **fechaInicio**: fecha en que comienza la reserva.
- **fechaFin**: fecha en que finaliza la reserva.
- **numero_personas**: número de personas en la reserva.
- **estado**: estado de la reserva (activa, cancelada, completada).
- **codigo**: código único asociado a la reserva.
- **precio**: monto total estimado de la reserva.
- **mesa_id**: `FK`, referencia a la mesa reservada.
- **usuario_email**: `FK`, referencia al usuario que realiza la reserva.

---

### 4. `mesa`
Representa las mesas disponibles en el establecimiento.

- **numero**: `PK`, número identificador de la mesa.
- **capacidad**: número de personas que puede acomodar.
- **ubicacion**: ubicación de la mesa dentro del local.
- **estado**: disponibilidad de la mesa (libre, ocupada, reservada).
- **precio**: costo de la reserva de la mesa.

---

### 5. `PagoReserva`
Representa el pago realizado para una reserva.

- **id**: `PK`, identificador del pago.
- **metodo_pago**: método usado (efectivo, tarjeta, etc.).
- **monto**: valor pagado.
- **usuario_email**: `FK`, referencia al usuario que paga.
- **reserva_id**: `FK`, referencia a la reserva asociada.

---

### 6. `comprobante_reserva`
Representa el comprobante generado por el pago de una reserva.

- **id**: `PK`, identificador del comprobante.
- **fecha_emision**: fecha en la que se generó el comprobante.
- **reserva_id**: `FK`, reserva relacionada.
- **usuario_email**: `FK`, usuario asociado.
- **pago_reserva_id**: `FK`, pago asociado.

---

### 7. `producto`
Representa los productos ofrecidos (alimentos, bebidas, etc.).

- **id**: `PK`, identificador del producto.
- **nombre**: nombre del producto.
- **descripcion**: descripción del producto.
- **precio**: precio unitario del producto.
- **estado**: disponibilidad del producto (activo/inactivo).
- **stock**: cantidad disponible en inventario.
- **url**: imagen o enlace relacionado con el producto.

---

### 8. `detalle_pedido`
Contiene los productos solicitados en un pedido.

- **id**: `PK`, identificador del detalle de pedido.
- **fecha_emision**: fecha del pedido.
- **carbuy_id**: `FK`, carrito asociado.
- **producto_id**: `FK`, producto solicitado.
- **usuario_email**: `FK`, usuario que realizó el pedido.

---

### 9. `pago`
Representa un pago por un pedido.

- **id**: `PK`, identificador del pago.
- **detalle_pedido_id**: `FK`, detalle del pedido pagado.
- **usuario_email**: `FK`, usuario que realizó el pago.
- **monto**: cantidad pagada.
- **metodo_pago**: forma en que se realizó el pago.

---

### 10. `comprobante`
Representa el comprobante generado por un pago de pedido.

- **id**: `PK`, identificador del comprobante.
- **detalle_pedido_id**: `FK`, pedido al que pertenece.
- **pago_id**: `FK`, pago relacionado.
- **fecha_emision**: fecha en que se generó el comprobante.
- **usuario_email**: `FK`, usuario asociado.

---

### 11. `carbuy`
Representa un carrito de compras temporal antes de generar el pedido.

- **id**: `PK`, identificador del carrito.
- **estado**: estado del carrito (activo, cerrado).
- **total**: total del carrito.
- **cantidad**: número de productos.
- **producto_id**: `FK`, producto en el carrito.

---

##  Relaciones

###  `usuario` 1 --- * `reserva`
Un usuario puede realizar varias reservas.

###  `reserva` * --- 1 `mesa`
Cada reserva está asociada a una mesa específica.

###  `reserva` 1 --- * `PagoReserva`
Una reserva puede tener múltiples pagos.

###  `usuario` 1 --- * `PagoReserva`
Un usuario puede hacer varios pagos de reserva.

###  `reserva` 1 --- 1 `comprobante_reserva`
Cada reserva tiene un único comprobante de pago.

###  `detalle_pedido` * --- 1 `producto`
Cada detalle está asociado a un solo producto.

###  `detalle_pedido` * --- 1 `carbuy`
Cada detalle pertenece a un carrito de compras.

###  `detalle_pedido` * --- 1 `usuario`
Cada pedido es realizado por un usuario.

###  `detalle_pedido` 1 --- 1 `pago`
Cada pedido tiene un único pago asociado.

###  `pago` 1 --- 1 `comprobante`
Cada pago genera un comprobante.

###  `carbuy` * --- 1 `producto`
Un carrito contiene productos agregados por el usuario.

###  `admin` 1 --- * `producto`
Un administrador puede crear varios productos.

###  `admin` 1 --- * `mesa`
Un administrador puede crear varias mesas para reservas.

###  `admin` 1 --- * `PagoReserva`
Un administrador puede gestionar múltiples pagos de reserva.


---

 Este modelo ER describe las relaciones entre reservas, pedidos y pagos en un sistema de cafetería digital llamado **CaffeNet**.


 ## Imagen

 ![Diagrama MER](img/diagrama%20mer.png)
