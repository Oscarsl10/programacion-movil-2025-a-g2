# Backend Base – CaffeNet

Este backend implementa una arquitectura genérica basada en controladores, servicios y repositorios reutilizables. La base está diseñada para facilitar el desarrollo de funcionalidades CRUD con auditoría y borrado lógico para cualquier entidad del sistema.

---

## Paquete: `com.corhuila.Backend_CaffeNet.common.base`

### `ABaseEntity` (Entidad Base)

Clase abstracta que representa los atributos comunes para todas las entidades del sistema.

#### Atributos:
- `Long id` – Identificador único.
- `Boolean status` – Estado lógico (activo/inactivo).
- `LocalDateTime createdAt`, `updatedAt`, `deletedAt` – Tiempos de creación, modificación y eliminación.
- `Long createdBy`, `updatedBy`, `deletedBy` – Usuario responsable de cada acción.

> Esta clase se marca con `@MappedSuperclass` para herencia en JPA.

---

### `IBaseRepository<T, ID>`

Interfaz que extiende de `JpaRepository`, permitiendo operaciones básicas con la base de datos.

---

### `IBaseService<T>`

Interfaz que define operaciones CRUD básicas:

```java
List<T> all();
List<T> findByStateTrue();
T findById(Long id) throws Exception;
T save(T entity) throws Exception;
void update(Long id, T entity) throws Exception;
void delete(Long id) throws Exception;
```

---

### `ABaseService<T>` (Servicio Base)

Clase abstracta que implementa `IBaseService<T>` y centraliza la lógica común para todas las entidades.

#### Funcionalidades clave:
- **`save()`**: Guarda la entidad y asigna `createdBy` y `createdAt`.
- **`update()`**: Actualiza propiedades salvo las restringidas (`id`, `createdAt`, `deletedAt`, etc.).
- **`delete()`**: Implementa borrado lógico (`deletedAt`, `deletedBy`).
- **`findById()`**: Lanza excepción si no se encuentra el registro.
- **`findByStateTrue()`**: Devuelve todos los registros (a adaptar si se usa status).

---

### `ABaseController<T, S>` (Controlador Base)

Controlador REST genérico que expone endpoints estándar para cualquier entidad.

#### Atributos:
- `S service`: Servicio genérico para la entidad.
- `String entityName`: Nombre descriptivo de la entidad.

#### Endpoints:
| Método | Ruta            | Descripción                         |
|--------|------------------|-------------------------------------|
| GET    | `/`              | Listar registros activos.           |
| GET    | `/{id}`          | Buscar por ID.                      |
| POST   | `/`              | Crear nuevo registro.               |
| PUT    | `/{id}`          | Actualizar un registro.             |
| DELETE | `/{id}`          | Borrado lógico del registro.        |

Cada endpoint devuelve un objeto `ApiResponseDto`.

---

## Paquete: `com.corhuila.Backend_CaffeNet.common.Dto`

### `ApiResponseDto<T>`

DTO genérico que encapsula las respuestas de los endpoints de la API.

#### Atributos:
- `Boolean status`: Indica si la operación fue exitosa.
- `T data`: Contenido devuelto por la operación.
- `String message`: Mensaje descriptivo para el cliente.

---

## Consideraciones

- El sistema implementa **borrado lógico** (no se elimina el registro de la BD).
- Se utilizan valores fijos (`1L`, `2L`, `3L`) para auditoría, idealmente deberían extraerse del usuario autenticado.
- Se puede extender fácilmente para nuevas entidades heredando de `ABaseEntity`, `ABaseService`, y `ABaseController`.



## Módulo: `Comprobante`

### Paquetes
- `modules.comprobante.Controller.ComprobanteController`
- `modules.comprobante.Entity.Comprobante`
- `modules.comprobante.Service.ComprobanteService`
- `modules.comprobante.IRepository.IComprobanteRepository`
- `modules.comprobante.IService.IComprobanteService`

### Arquitectura
- Extiende las clases base genéricas `ABaseController`, `ABaseService`, `IBaseRepository`, `IBaseService`.

### Entidad: `Comprobante`

```java
@Temporal(TemporalType.TIMESTAMP)
private Date fecha_Emision;

@ManyToOne
@JoinColumn(name = "pedido_id", nullable = false)
private Pedido pedido;

@ManyToOne
@JoinColumn(name = "user_id", nullable = false)
private Users users;
```

---

## Detalle_PedidoController.java

```java
package com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Controller;

import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.IService.IDetalle_PedidoService;
import com.corhuila.Backend_CaffeNet.common.base.ABaseController;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Entity.Detalle_Pedido;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:8100"})

@RestController
@RequestMapping("/api/v1/detalle_pedido")
public class Detalle_PedidoController extends ABaseController<Detalle_Pedido, IDetalle_PedidoService> {

    public Detalle_PedidoController(IDetalle_PedidoService service) {
        super(service, "Continent");
    }
}
```

## Detalle_Pedido.java

```java
package com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Entity;

import com.corhuila.Backend_CaffeNet.common.base.ABaseEntity;
import com.corhuila.Backend_CaffeNet.modules.pedido.Entity.Pedido;
import com.corhuila.Backend_CaffeNet.modules.producto.Entity.Producto;
import com.corhuila.Backend_CaffeNet.modules.user.Entity.Users;
import jakarta.persistence.*;

@Entity
@Table(name = "detalle_pedido")
public class Detalle_Pedido extends ABaseEntity {

    @Column(name = "subtotal")
    private Double subtotal;

    @ManyToOne
    @JoinColumn(name = "pedido_id", nullable = false) // Clave foránea
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false) // Clave foránea
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;

    public Double getSubtotal() {
        return subtotal = calcularSubtotal();
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }


    public double calcularSubtotal() {
        if (producto == null) {
            throw new IllegalStateException("El producto no puede ser nulo.");
        }

        if (producto.getPrecio() == null) {
            throw new IllegalStateException("El precio del producto no puede ser nulo.");
        }

        if (pedido.getCantidad() == null || pedido.getCantidad() <= 0) {
            throw new IllegalStateException("La cantidad debe ser mayor que cero.");
        }

        // Cálculo del subtotal
        double precio = producto.getPrecio();
        double totalPagar = pedido.getCantidad() * precio;

        // Guardar el subtotal en el atributo
        this.subtotal = totalPagar;

        return totalPagar;
    }
}
```

## IDetalle_PedidoRepository.java

```java
package com.corhuila.Backend_CaffeNet.modules.detalle_pedido.IRepository;

import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Entity.Detalle_Pedido;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IDetalle_PedidoRepository extends IBaseRepository<Detalle_Pedido, Long> {
    List<Detalle_Pedido> findByPedidoId(Long id);
}
```

## IDetalle_PedidoService.java

```java
package com.corhuila.Backend_CaffeNet.modules.detalle_pedido.IService;

import com.corhuila.Backend_CaffeNet.common.base.IBaseService;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Entity.Detalle_Pedido;

public interface IDetalle_PedidoService extends IBaseService<Detalle_Pedido> {

}
```

## Detalle_PedidoService.java

```java
package com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Service;

import com.corhuila.Backend_CaffeNet.common.base.ABaseService;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.Entity.Detalle_Pedido;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.IService.IDetalle_PedidoService;
import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.detalle_pedido.IRepository.IDetalle_PedidoRepository;
import com.corhuila.Backend_CaffeNet.modules.pedido.Entity.Pedido;
import com.corhuila.Backend_CaffeNet.modules.pedido.IRepository.IPedidoRepository;
import com.corhuila.Backend_CaffeNet.modules.producto.Entity.Producto;
import com.corhuila.Backend_CaffeNet.modules.producto.IRepository.IProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Detalle_PedidoService extends ABaseService<Detalle_Pedido> implements IDetalle_PedidoService {

    @Autowired
    private IDetalle_PedidoRepository detalle_pedidoRepository;

    @Override
    protected IBaseRepository<Detalle_Pedido, Long> getRepository() {
        return detalle_pedidoRepository;
    }

}
```

# Pago Module

## PagoController.java

```java
package com.corhuila.Backend_CaffeNet.modules.pago.Controller;

import com.corhuila.Backend_CaffeNet.modules.pago.IService.IPagoService;
import com.corhuila.Backend_CaffeNet.common.base.ABaseController;
import com.corhuila.Backend_CaffeNet.modules.pago.Entity.Pago;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:8100"})

@RestController
@RequestMapping("/api/v1/pago")
public class PagoController extends ABaseController<Pago, IPagoService> {

    public PagoController(IPagoService service) {
        super(service, "Continent");
    }
}
```

## Pago.java

```java
package com.corhuila.Backend_CaffeNet.modules.pago.Entity;

import com.corhuila.Backend_CaffeNet.common.base.ABaseEntity;
import com.corhuila.Backend_CaffeNet.modules.pedido.Entity.Pedido;
import jakarta.persistence.*;

@Entity
@Table(name = "pago")
public class Pago extends ABaseEntity {

    @Column(name = "metodo_Pago")
    private String metodo_Pago;

    @Column(name = "monto")
    private String monto;

    @ManyToOne
    @JoinColumn(name = "pedido_id", nullable = false) // Clave foránea
    private Pedido pedido;

    public String getMetodo_Pago() {
        return metodo_Pago;
    }

    public void setMetodo_Pago(String metodo_Pago) {
        this.metodo_Pago = metodo_Pago;
    }

    public String getMonto() {
        return monto;
    }

    public void setMonto(String monto) {
        this.monto = monto;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

}
```

## IPagoRepository.java

```java
package com.corhuila.Backend_CaffeNet.modules.pago.IRepository;

import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.pago.Entity.Pago;
import org.springframework.stereotype.Repository;

@Repository
public interface IPagoRepository extends IBaseRepository<Pago, Long> {
}
```

## IPagoService.java

```java
package com.corhuila.Backend_CaffeNet.modules.pago.IService;

import com.corhuila.Backend_CaffeNet.common.base.IBaseService;
import com.corhuila.Backend_CaffeNet.modules.pago.Entity.Pago;

public interface IPagoService extends IBaseService<Pago> {

}
```

## PagoService.java

```java
package com.corhuila.Backend_CaffeNet.modules.pago.Service;

import com.corhuila.Backend_CaffeNet.common.base.ABaseService;
import com.corhuila.Backend_CaffeNet.modules.pago.Entity.Pago;
import com.corhuila.Backend_CaffeNet.modules.pago.IService.IPagoService;
import com.corhuila.Backend_CaffeNet.common.base.IBaseRepository;
import com.corhuila.Backend_CaffeNet.modules.pago.IRepository.IPagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PagoService extends ABaseService<Pago> implements IPagoService {

    @Override
    protected IBaseRepository<Pago, Long> getRepository() {
        return pagoRepository;
    }

    @Autowired
    private IPagoRepository pagoRepository;
}
```

## Módulo: `pedido`

### Funcionalidad
Gestiona los pedidos realizados por los clientes dentro del sistema CaffeNet. Incluye la creación, consulta, actualización y borrado lógico de pedidos.

### Estructura
- `Pedido`: Entidad principal.
- `PedidoDTO`: Objeto de transferencia de datos.
- `PedidoRepository`: Interfaz de acceso a datos (extiende `BaseRepository`).
- `PedidoServiceImpl`: Lógica de negocio específica (extiende `BaseServiceImpl`).
- `PedidoController`: Controlador REST (extiende `BaseController`).

### Flujo general
```
Cliente HTTP → PedidoController → PedidoServiceImpl → PedidoRepository → BD
```

### Endpoints principales
- `GET /api/pedidos`: Lista todos los pedidos.
- `GET /api/pedidos/{id}`: Consulta un pedido por ID.
- `POST /api/pedidos`: Crea un nuevo pedido.
- `PUT /api/pedidos/{id}`: Actualiza un pedido.
- `DELETE /api/pedidos/{id}`: Elimina lógicamente un pedido (cambia estado o marca `deletedAt`).

---

## Módulo: `producto`

### Funcionalidad
Gestiona los productos ofrecidos en CaffeNet, como cafés, postres y snacks.

### Estructura
- `Producto`: Entidad principal con atributos como `nombre`, `precio`, `stock`.
- `ProductoDTO`: Objeto de transferencia.
- `ProductoRepository`: Acceso a datos (extiende `BaseRepository`).
- `ProductoServiceImpl`: Lógica de negocio (extiende `BaseServiceImpl`).
- `ProductoController`: API REST para productos (extiende `BaseController`).

### Flujo general
```
Cliente HTTP → ProductoController → ProductoServiceImpl → ProductoRepository → BD
```

### Endpoints principales
- `GET /api/productos`: Lista productos activos.
- `POST /api/productos`: Crea un nuevo producto.
- `PUT /api/productos/{id}`: Edita un producto.
- `DELETE /api/productos/{id}`: Eliminación lógica del producto.

---

## Módulo: `reserva`

### Funcionalidad
Permite a los clientes reservar espacios o servicios dentro de CaffeNet, como áreas de coworking o mesas.

### Estructura
- `Reserva`: Entidad principal con campos como `fechaInicio`, `fechaFin`, `vehiculo`, `user`, `espacio`.
- `ReservaDTO`: DTO con validaciones.
- `ReservaRepository`: Interface JPA (extiende `BaseRepository`).
- `ReservaServiceImpl`: Lógica de negocio, incluye validaciones de disponibilidad (extiende `BaseServiceImpl`).
- `ReservaController`: API pública para reservas (extiende `BaseController`).

### Flujo general
```
Cliente HTTP → ReservaController → ReservaServiceImpl → ReservaRepository → BD
```

### Endpoints principales
- `GET /api/reservas`: Obtiene todas las reservas activas.
- `POST /api/reservas`: Crea una reserva si hay espacio disponible y tarifa compatible con el vehículo.
- `PUT /api/reservas/{id}`: Permite modificar una reserva sin alterar lógica de creación.
- `DELETE /api/reservas/{id}`: Eliminación lógica de la reserva y restauración de espacio.
