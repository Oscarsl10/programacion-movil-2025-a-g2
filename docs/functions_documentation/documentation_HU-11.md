# Documentación de Historia de Usuario: Gestión de Productos y Stock Dinámico

## Descripción

Como administrador y usuario, puedo crear, visualizar, editar y eliminar productos, y el sistema mantiene el stock dinámico según los pedidos realizados por los clientes. Además, no permite agregar al carrito productos con stock insuficiente.

---

## Criterios de Aceptación y Soporte en el Backend

### 1. CRUD completo de productos en la vista de administración

- **Crear producto**
  - **Endpoint:** `POST /api/v1/producto`
  - **Controlador:** `ProductoController`
  - **Servicio:** `IProductoService`
  - **Entidad:** `Producto`
  - **Descripción:** Permite crear productos con nombre, descripción, estado, precio, stock y URL.

- **Listar productos**
  - **Endpoint:** `GET /api/v1/producto`
  - **Controlador:** `ProductoController`
  - **Descripción:** Permite obtener todos los productos registrados, incluyendo el stock actual.

- **Editar producto**
  - **Endpoint:** `PUT /api/v1/producto/{id}`
  - **Controlador:** `ProductoController`
  - **Descripción:** Permite actualizar los datos de un producto existente.

- **Eliminar producto**
  - **Endpoint:** `DELETE /api/v1/producto/{id}`
  - **Controlador:** `ProductoController`
  - **Descripción:** Permite eliminar un producto del sistema.

---

### 2. El stock de cada producto se decrementa automáticamente al generar un pedido

- **Servicio:** `Detalle_PedidoService`
- **Método:** `save(Detalle_Pedido entity)`
- **Lógica:**  
  Al confirmar un pedido, se descuenta del stock del producto la cantidad comprada:
  ```java
  producto.setStock(producto.getStock() - qty);
  productoRepository.save(producto);