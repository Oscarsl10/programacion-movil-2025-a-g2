# Diagrama MR 

## 1. Descripción General

Este modelo relacional cubre todas las entidades necesarias para gestionar:

- **Usuarios** (clientes, administradores, etc.)  
- **Productos** y compras (carrito → pedido)  
- **Mesas** y **reservas** de instalaciones  
- **Pagos** tanto de pedidos como de reservas  
- **Comprobantes** de pago asociados  

Cada tabla incluye campos de auditoría (`created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`) y un campo lógico de estado (`status` o `state`) para eliminación suave.

## 2. Tablas y sus Campos

### 2.1. Tabla `users`

Información básica de todos los usuarios del sistema (clientes, empleados, etc.).

| Campo         | Tipo               | Descripción                                         |
|---------------|--------------------|-----------------------------------------------------|
| `id`          | BIGINT (PK)        | Identificador único                                 |
| `email`       | VARCHAR(255)       | Correo electrónico                                  |
| `password`    | VARCHAR(255)       | Contraseña cifrada                                  |
| `full_name`   | VARCHAR(100)       | Nombre completo                                     |
| `telefono`    | VARCHAR(10)        | Teléfono                                            |
| **Auditoría** | —                  | `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by` |
| `status`      | BIT(1)             | Estado lógico (activo/inactivo)                     |

---

### 2.2. Tabla `admin`

Administrador del sistema (credenciales y datos de contacto).

| Campo         | Tipo               | Descripción                                         |
|---------------|--------------------|-----------------------------------------------------|
| `telefono`    | VARCHAR(10)        | Teléfono de contacto                                |
| `full_name`   | VARCHAR(100)       | Nombre completo                                     |
| `email`       | VARCHAR(255)       | Correo electrónico                                  |
| `password`    | VARCHAR(255)       | Contraseña cifrada                                  |
| **Auditoría** | —                  | `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by` |

---

### 2.3. Tabla `producto`

Catálogo de productos disponibles para compra:

| Campo         | Tipo               | Descripción                                         |
|---------------|--------------------|-----------------------------------------------------|
| `id`          | BIGINT (PK)        | Identificador único                                 |
| `nombre`      | VARCHAR(150)       | Nombre del producto                                 |
| `descripcion` | VARCHAR(250)       | Detalle o descripción                               |
| `precio`      | DOUBLE             | Precio unitario                                     |
| `stock`       | INT                | Unidades disponibles                                |
| `url`         | VARCHAR(255)       | Enlace a imagen o recurso                           |
| **Auditoría** | —                  | `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by` |
| `status`      | BIT(1)             | Estado lógico (activo/inactivo)                     |

---

### 2.4. Tabla `mesa`

Mesas o espacios físicos que pueden reservarse:

| Campo         | Tipo               | Descripción                                         |
|---------------|--------------------|-----------------------------------------------------|
| `id`          | BIGINT (PK)        | Identificador único                                 |
| `numero`      | INT                | Número de la mesa                                   |
| `capacidad`   | INT                | Número máximo de personas                           |
| `precio`      | DOUBLE             | Precio por hora o unidad de tiempo                  |
| `ubicacion`   | VARCHAR(100)       | Ubicación dentro del local                          |
| **Auditoría** | —                  | mismos campos de auditoría                          |
| `status`      | BIT(1)             | Disponible / no disponible                          |

---

### 2.5. Tabla `reserva`

Registro de reservas de mesas por parte de usuarios:

| Campo           | Tipo               | Descripción                                         |
|-----------------|--------------------|-----------------------------------------------------|
| `id`            | BIGINT (PK)        | Identificador único                                 |
| `user_id`       | VARCHAR(255) (FK)  | Usuario que reserva                                 |
| `mesa_id`       | BIGINT (FK)        | Mesa reservada                                      |
| `fecha_inicio`  | DATETIME           | Inicio de la reserva                                |
| `fecha_fin`     | DATETIME           | Fin de la reserva                                   |
| `num_personas`  | INT                | Número de asistentes                                |
| `codigo`        | VARCHAR(255)       | Código de reserva (opcional)                        |
| **Auditoría**   | —                  | mismos campos de auditoría                          |
| `status`        | BIT(1)             | Activa / cancelada                                  |

---

### 2.6. Tabla `pago_reserva`

Pagos asociados a reservas:

| Campo           | Tipo               | Descripción                                         |
|-----------------|--------------------|-----------------------------------------------------|
| `id`            | BIGINT (PK)        | Identificador único                                 |
| `reserva_id`    | BIGINT (FK)        | Reserva pagada                                      |
| `monto`         | DECIMAL(38,2)      | Monto pagado                                        |
| `metodo_pago`   | VARCHAR(255)       | Tarjeta, efectivo, etc.                             |
| **Auditoría**   | —                  | mismos campos de auditoría                          |
| `status`        | BIT(1)             | Pagado / pendiente                                  |

---

### 2.7. Tabla `comprobante_reserva`

Comprobantes de pago emitidos para reservas:

| Campo             | Tipo               | Descripción                                         |
|-------------------|--------------------|-----------------------------------------------------|
| `id`              | BIGINT (PK)        | Identificador único                                 |
| `pago_reserva_id` | BIGINT (FK)        | Pago de reserva asociado                            |
| `reserva_id`      | BIGINT (FK)        | Reserva correspondiente                            |
| `fecha_emision`   | DATETIME           | Fecha de emisión                                    |
| **Auditoría**     | —                  | mismos campos de auditoría                          |
| `status`          | BIT(1)             | Emitido / anulado                                   |

---

### 2.8. Tabla `car_buy`

“Carrito” de compra temporal antes de generar el pedido:

| Campo         | Tipo               | Descripción                                         |
|---------------|--------------------|-----------------------------------------------------|
| `id`          | BIGINT (PK)        | Identificador único                                 |
| `user_id`     | VARCHAR(255) (FK)  | Usuario propietario del carrito                     |
| `product_id`  | BIGINT (FK)        | Producto agregado                                   |
| `cantidad`    | INT                | Cantidad seleccionada                               |
| `total`       | DOUBLE             | Sub‐total (`precio × cantidad`)                     |
| **Auditoría** | —                  | mismos campos de auditoría                          |
| `status`      | BIT(1)             | Activo / finalizado                                 |

---

### 2.9. Tabla `pedido`

Pedidos generados a partir del carrito:

| Campo          | Tipo               | Descripción                                         |
|----------------|--------------------|-----------------------------------------------------|
| `id`           | BIGINT (PK)        | Identificador único                                 |
| `user_id`      | VARCHAR(255) (FK)  | Usuario que realiza el pedido                       |
| `nombre`       | VARCHAR(150)       | Alias o descripción del pedido                      |
| `fecha_pedido` | DATETIME           | Fecha de creación                                   |
| `cantidad`     | INT                | Total de líneas en el pedido                        |
| **Auditoría**  | —                  | mismos campos de auditoría                          |
| `estado`       | VARCHAR(255)       | Por preparar, enviado, entregado, etc.              |

---

### 2.10. Tabla `detalle_pedido`

Líneas de pedido: productos incluidos en cada pedido:

| Campo           | Tipo               | Descripción                                         |
|-----------------|--------------------|-----------------------------------------------------|
| `id`            | BIGINT (PK)        | Identificador único                                 |
| `car_buy_id`    | BIGINT (FK)        | Referencia opcional al `car_buy` original           |
| `pedido_id`     | BIGINT (FK)        | Pedido al que pertenece                             |
| `producto_id`   | BIGINT (FK)        | Producto solicitado                                 |
| `cantidad`      | INT                | Cantidad pedida                                     |
| **Auditoría**   | —                  | mismos campos de auditoría                          |
| `status`        | BIT(1)             | Activo / anulado                                    |
| `fecha_emision` | DATETIME           | Fecha del detalle (si se requiere)                  |

---

### 2.11. Tabla `pago`

Pagos asociados a pedidos:

| Campo               | Tipo               | Descripción                                         |
|---------------------|--------------------|-----------------------------------------------------|
| `id`                | BIGINT (PK)        | Identificador único                                 |
| `detalle_pedido_id` | BIGINT (FK)        | Línea de pedido que se paga                         |
| `monto`             | DOUBLE             | Monto efectivo                                      |
| `metodo_pago`       | VARCHAR(255)       | Tarjeta, efectivo, etc.                             |
| **Auditoría**       | —                  | mismos campos de auditoría                          |
| `status`            | BIT(1)             | Completado / pendiente                              |

---

### 2.12. Tabla `comprobante`

Comprobantes de pago para pedidos:

| Campo               | Tipo               | Descripción                                         |
|---------------------|--------------------|-----------------------------------------------------|
| `id`                | BIGINT (PK)        | Identificador único                                 |
| `pago_id`           | BIGINT (FK)        | Pago de pedido correspondiente                      |
| `detalle_pedido_id` | BIGINT (FK)        | Línea de pedido ligada                              |
| `fecha_emision`     | DATETIME           | Fecha de emisión                                    |
| **Auditoría**       | —                  | mismos campos de auditoría                          |
| `status`            | BIT(1)             | Emitido / anulado                                   |

---

## 3. Relaciones

1. **`users` ⇆ `car_buy` ⇆ `detalle_pedido` ⇆ `pedido`**  
   - Un usuario tiene un carrito con múltiples productos (`car_buy`), de los cuales se genera un pedido (`pedido`) con sus líneas (`detalle_pedido`).  

2. **`detalle_pedido` ⇆ `pago` ⇆ `comprobante`**  
   - Cada línea de pedido puede tener uno o varios pagos, y por cada pago se emite un comprobante.  

3. **`users` ⇆ `reserva` ⇆ `mesa`**  
   - Un usuario reserva una o más mesas para franjas horarias específicas.  

4. **`reserva` ⇆ `pago_reserva` ⇆ `comprobante_reserva`**  
   - Cada reserva puede pagarse parcial o totalmente, y cada pago genera su comprobante.  

---

## 4. Consideraciones Finales

- Todos los **campos de auditoría** permiten trazabilidad completa de creación, modificación y eliminación lógica de registros.  
- El uso de **campos `status`** o `state` garantiza soft-delete y seguimiento diferenciado de estado (activo/inactivo, emitido/anulado, pendiente/completado).  
- La separación entre pagos de **pedidos** y **reservas** facilita reportes y reglas de negocio independientes.  


## Imagen

![Diagrama MR](img/Diagrama%20MR.png)