# Historia de Usuario #12: Exploración y gestión de carrito

**Como** usuario registrado,  **quiero** poder explorar los productos disponibles y agregar productos al carrito,  **para** luego confirmar un pedido si el stock lo permite.

---

### Objetivo
Permitir a los usuarios seleccionar productos del catálogo, agregarlos al carrito, ajustar cantidades, eliminar elementos, vaciar el carrito o confirmar el pedido, validando la disponibilidad de stock.

---

### 1. Ver productos publicados al iniciar sesión 
**Funcionalidad**
- Al iniciar sesión, el usuario debe poder ver los productos disponibles con stock.
- El frontend consume un endpoint para listar productos. Solo se muestran los productos activos y con stock > 0.

```
 @Override
    @Transactional
    public CarBuy save(CarBuy entity) throws Exception {
        Producto producto = productoRepository
                .findById(entity.getProducto().getId())
                .orElseThrow(() -> new Exception("Producto no encontrado"));

        // Busca si ya hay un CarBuy ACTIVO para este producto
        CarBuy existente = carBuyRepository
                .findByProductoIdAndEstado(entity.getProducto().getId(), EstadoCarrito.ACTIVO)
                .stream()
                .findFirst()
                .orElse(null);

        // Si existe uno ACTIVO, suma la cantidad
        if (existente != null) {
            int nuevaCantidad = existente.getCantidad() + entity.getCantidad();
            if (producto.getStock() < nuevaCantidad) {
                throw new Exception("Stock insuficiente. Disponible: " + producto.getStock());
            }
            existente.setCantidad(nuevaCantidad);
            existente.setTotal(producto.getPrecio() * nuevaCantidad);
            return carBuyRepository.save(existente);
        } else {
            // Si no existe ACTIVO, crea uno nuevo (aunque haya uno COMPRADO)
            if (producto.getStock() < entity.getCantidad()) {
                throw new Exception("Stock insuficiente. Disponible: " + producto.getStock());
            }
            entity.setId(null); // <-- IMPORTANTE: fuerza a crear uno nuevo
            entity.setTotal(producto.getPrecio() * entity.getCantidad());
            entity.setEstado(EstadoCarrito.ACTIVO);
            return carBuyRepository.save(entity);
        }
    }
```
---

### 2. Añadir productos al carrito solo si tienen stock disponible y ajustar la cantidad de prodcutos en el carrito sin superar el stock

- **Funcionalidad**:
- El usuario solo puede añadir productos al carrito si hay suficiente stock.
- **Implementación**:
  - en el `carBuyService.save()`. en este fragmento de codigo se especfifica la funcionalidad de:
  ```
     if (existente != null) {
            int nuevaCantidad = existente.getCantidad() + entity.getCantidad();
            if (producto.getStock() < nuevaCantidad) {
                throw new Exception("Stock insuficiente. Disponible: " + producto.getStock());
            }
            existente.setCantidad(nuevaCantidad);
            existente.setTotal(producto.getPrecio() * nuevaCantidad);
            return carBuyRepository.save(existente);
        } else {
            // Si no existe ACTIVO, crea uno nuevo (aunque haya uno COMPRADO)
            if (producto.getStock() < entity.getCantidad()) {
                throw new Exception("Stock insuficiente. Disponible: " + producto.getStock());
            }
            entity.setId(null); // <-- IMPORTANTE: fuerza a crear uno nuevo
            entity.setTotal(producto.getPrecio() * entity.getCantidad());
            entity.setEstado(EstadoCarrito.ACTIVO);
            return carBuyRepository.save(entity);
        }

  ```
  - solo si hay un producto existente lo valida y analiza el stock.
  - Evita que un usuario agregue más unidades al carrito de las que realmente hay disponibles en inventario.
  - lo actualiza y aumenta el total.

---

### 3. Ajustar cantidad de productos en el carrito sin superar el stock
**Funcionalidad**
-  El usuario puede cambiar la cantidad de productos en el carrito, pero no puede exceder el stock disponible.
- **Implementación**:
  - El servicio valida en el backend que la cantidad seleccionada no supere el stock (`Detalle_PedidoService.save()`).

```
 CarBuy existente = carBuyRepository
    .findByProductoIdAndEstado(entity.getProducto().getId(), EstadoCarrito.ACTIVO)
    .stream()
    .findFirst()
    .orElse(null);

// Si existe uno ACTIVO, suma la cantidad
if (existente != null) {
    int nuevaCantidad = existente.getCantidad() + entity.getCantidad();
    if (producto.getStock() < nuevaCantidad) {
        throw new Exception("Stock insuficiente. Disponible: " + producto.getStock());
    }
    existente.setCantidad(nuevaCantidad);
    existente.setTotal(producto.getPrecio() * nuevaCantidad);
    return carBuyRepository.save(existente);
}
```
- se valida, tanto al crear un nuevo ítem como al actualizar uno existente en estado ACTIVO. 
- la cantidad total solicitada no exceda el stock del producto.
- permite modificar la cantidad de productos en el carrito, pero garantiza que nunca se supere el límite disponible en inventario.
---

### 4. Mostrar total dinámico por producto (cantidad × precio)
 **Funcionalidad**
- El sistema debe mostrar el total por cada producto (precio unitario × cantidad).
- **Implementación**:
  - Este cálculo se realiza en frontend (puede obtener datos del carrito y del producto).
  - Puede calcularse directamente con los datos disponibles (`carBuy.getCantidad()` y `producto.getPrecio()`).
  - en la funcion de carBuyService,save() se realizan estas 2 funciones para hallar la cantidad x precio:
  ### primero:
  - se establecen los valores del carrito el precio y la cantidad.
```
existente.setTotal(producto.getPrecio() * nuevaCantidad);
```
### despues:
- se multiplican ambos valores dados y se guarda en total.
```
entity.setTotal(producto.getPrecio() * entity.getCantidad());
```
---

### 5. Botón para vaciar carrito
 **Funcionalidad**
- El usuario puede eliminar todos los productos del carrito.
- **Implementación**:
  - Endpoint backend: `DELETE /api/v1/carbuys/deleteAll`
  - Servicio: `carBuyService.deleteAll()`
  ```
   // Método para eliminar todos los productos
    public void deleteAll() {
        try {
            List<CarBuy> carBuys = carBuyRepository.findAll();
            for (CarBuy carBuy : carBuys) {
                carBuy.setEstado(EstadoCarrito.COMPRADO); // o INACTIVO si tienes ese estado
                carBuyRepository.save(carBuy);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al limpiar el carrito: " + e.getMessage());
        }
    }
  
  ```
 ###  este metodo permite eliminar o vaciar todo el carrito de manera rrapida.
---

### 6. Botón para eliminar un producto del carrito
 **Funcionalidad**
- El usuario puede eliminar un producto específico del carrito.  
**Implementación**:
  - Endpoint backend: `DELETE /api/v1/carbuys/delete/{id}`
  - Servicio: `carBuyService.deleteById(id)`
```
public void deleteById(Long id) {
        if (carBuyRepository.existsById(id)) {
            carBuyRepository.deleteById(id);
        } else {
            throw new RuntimeException("Producto con ID " + id + " no encontrado.");
        }
    }
```


permite eliminar el carrito por id al presionar un boton implementando en el frontend.

--------



### 7. Botón para generar pedido
 **Funcionalidad**
- El usuario puede confirmar un pedido y se debe validar el stock, descontarlo y limpiar el carrito.
- **Implementación**:
  - Clase: `Detalle_PedidoService`
  - Método: `save(Detalle_Pedido entity)`
  - Pasos ejecutados:
    1. Cargar entidades `CarBuy` y `Producto`.
    2. Validar stock disponible.
    3. Descontar stock del producto.
    4. Marcar carrito como `COMPRADO`.
    5. Registrar fecha de emisión.
    6. Guardar detalle del pedido.
    7. Eliminar todos los registros del carrito (vaciar).
  - Controlador: `Detalle_PedidoController`, que hereda de `ABaseController`.
```
 @Override
    @Transactional
    public Detalle_Pedido save(Detalle_Pedido entity) throws Exception {
        // 1) Cargar entidades
        CarBuy car = carBuyRepository.findById(entity.getCarBuy().getId())
            .orElseThrow(() -> new Exception("CarBuy no encontrado"));
        Producto producto = productoRepository.findById(entity.getProducto().getId())
            .orElseThrow(() -> new Exception("Producto no encontrado"));

        // 2) Validar stock
        int qty = car.getCantidad();
        if (producto.getStock() < qty) {
            throw new Exception("Stock insuficiente para procesar pedido. Disponible: "
                                + producto.getStock());
        }

        // 3) Descontar stock
        producto.setStock(producto.getStock() - qty);
        productoRepository.save(producto);

        // 4) Marcar carrito como COMPRADO
        car.setEstado(com.corhuila.Backend_CaffeNet.modules.car_buys.Enum.EstadoCarrito.COMPRADO);
        carBuyRepository.save(car);

        // 5) Fijar fecha de emisión
        entity.setFecha_emision(new java.util.Date());

        // 6) Guardar detalle de pedido
        Detalle_Pedido saved = detalle_pedidoRepository.save(entity);

        // 7) Limpiar carbuys (vaciar carrito)
        carBuyService.deleteAll();

        return saved;
    }

