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

## Módulo: `Admin`

### Paquetes
- `modules.admin.Controller.AdminRestController`
- `modules.admin.Entity.Admin`
- `modules.admin.Service.AdminService`
- `modules.admin.IRepository.IAdminRepository`
- `modules.admin.request.LoginAdminRequest`

### Endpoints

| Método | Endpoint              | Descripción                                         |
|--------|------------------------|-----------------------------------------------------|
| GET    | `/api/admin`           | Obtener todos los administradores                  |
| POST   | `/api/addAdmin`        | Registrar un nuevo admin (requiere email autorizado `admin@gmail.com`) |
| POST   | `/api/loginAdmin`      | Validar login de administrador                     |
| GET    | `/api/getAdmin/{email}`| Obtener un admin por email                         |
| GET    | `/api/checkEmailAdmin` | Verifica si existe el email de admin               |
| PUT    | `/api/admin/{email}`   | Actualizar info del admin (nombre, teléfono, contraseña) |

### Lógica Principal

#### Registro de Admin
- Permite agregar un nuevo administrador **solo si el email autorizado es `admin@gmail.com`**.
- Rechaza si ya existe ese email en la tabla `Users` o `Admin`.

#### Login de Admin
- Usa `SHA-256` para verificar la contraseña.
- Compara el hash del input con el guardado en BD.

#### Update Admin
- Se puede actualizar nombre, teléfono y contraseña.
- Si la contraseña está vacía, no se actualiza.

---

## Entidad: `Admin`

```java
@Id
private String email;

@Column(length = 100)
private String full_name;

private String password;

@Column(length = 10)
private String telefono;
```

---

## LoginAdminRequest

```java
private String userId;
private String password;
```

---

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


## Módulo de Usuarios

Este módulo gestiona los usuarios de la plataforma CaffeNet. A continuación, se documentan los archivos principales involucrados.

## 1. `UsersRestController.java`

Controlador REST que expone los endpoints relacionados con los usuarios.

### Endpoints disponibles:

- `GET /api/user`: Lista todos los usuarios.
- `POST /api/addUser`: Agrega un nuevo usuario, asegurando que no sea un administrador existente.
- `POST /api/loginUser`: Autentica un usuario.
- `GET /api/getUser/{email}`: Retorna los datos del usuario identificado por el email.
- `GET /api/checkEmail`: Verifica si un email ya está registrado.
- `PUT /api/user/{email}`: Actualiza la información y/o contraseña del usuario.
- `POST /api/recuperar-contrasenia`: Genera y envía una nueva contraseña al correo del usuario.

## 2. `Users.java`

Entidad que representa a un usuario.

### Atributos:

- `email`: Identificador del usuario.
- `full_name`: Nombre completo.
- `password`: Contraseña (encriptada).
- `telefono`: Número telefónico.

## 3. `IUsersRepository.java`

Repositorio JPA para la entidad `Users`. Provee métodos CRUD y validación de existencia de emails.

### Métodos:

- `existsByEmail(String email)`

## 4. `LoginRequest.java`

Clase auxiliar para el manejo de solicitudes de login.

### Atributos:

- `userId`: Email del usuario.
- `password`: Contraseña sin encriptar.

## 5. `UsersService.java`

Servicio con la lógica de negocio para el manejo de usuarios.

### Métodos principales:

- `recuperarContrasenia(String email)`: Genera una contraseña nueva y la envía por correo.
- `generarContraseniaAleatoria(int length)`: Crea una contraseña aleatoria.
- `enviarCorreo(String destinatario, String nuevaContrasenia)`: Envia el correo con la nueva contraseña.
- `existsByEmail(String email)`: Verifica si el email existe.
- `findById(String email)`: Busca un usuario por email.
- `addUser(Users user)`: Agrega un nuevo usuario (con validación de email único).
- `hashContrasenia(String password)`: Encripta la contraseña usando SHA-256.
- `loginUser(LoginRequest loginRequest)`: Verifica la autenticidad del usuario.
- `save(Users user)`: Guarda o actualiza un usuario.
- `verificarContrasenia(String rawPassword, String hashedPassword)`: Compara contraseñas en texto plano y encriptadas.
- `findAll()`: Lista todos los usuarios.

---

**Nota**: Este módulo también interactúa con `IAdminRepository` para evitar colisión de emails con administradores.

## modulo car_buys
### Funcionalidad
este modulo implementa el carrito de productos para los clientes. A continuacion se documentan los archivos principales del modulo.

### Estructura
- `CarBuy`: Entidad principal con campos como `estado`, `total`, `cantidad`, `producto`.
- `CarBuyDTO`: DTO con validaciones.
- `CarBuyRepository`: Interface JPA (extiende `BaseRepository`).
- `CarBuyServiceImpl`: Lógica de negocio, incluye validaciones de disponibilidad (extiende `BaseServiceImpl`).
- `CarBuyController`: API pública para reservas (extiende `BaseController`).

### Flujo general
```
Cliente HTTP → CarBuyController → CarBuyServiceImpl → CarBuyRepository → BD
```

## 1. CarbuyController.
Controlador REST que expone los endpoints relacionados con el carrito.
### Endpoints disponibles:
- `delete /api/v1/carbuys/deleteAll`: borrar toda la lista de prodctos del carrito.
- `POST /api/v1/carbuys/delete/{id}`: eliminar cada pordcuto del carrito por id

## 2. `Carbuy.java`
Entidad que representa al carrito.

### Atributos:

- `estado`: estado del carrito.
- `total`: total de los productos en el carrito.
- `cantidad`: precio de los productos.
- `producto`: relacion llave foranea con la entidad producto.
## 3 EstdoCarrito enum
qui es donde se relaciona los estados en el carrito.
### valores dados:
- ACTIVO.
- COMPRADO.
- RETIRADO.
## 4. `ICarBuyRepository.java`

Repositorio JPA para la entidad `CarBuy`. Provee métodos CRUD heredados de la base.

## 5. `ICarBuyService.java`

Clase auxiliar para el manejo de solicitudes de login.
## 6 CarBuyService:
implementacion del Servicio con la lógica de negocio para el manejo de los productos en el carrito.

- `void deleteAll()`:al usar el metodo eliminar todos los produdctos del carro.
- `void deleteById(Long id)`: elimina por id los productos del carrito.

## modulo Mesa.
### Funcionalidad
este modulo implementa la mesa  para los clientes. A continuacion se documentan los archivos principales del modulo.

### Estructura
- `Mesa`: Entidad principal con campos como `numero`, `capacidad`, `ubicacion`, `estado`,`precio`.
- `CarBuyDTO`: DTO con validaciones.
- `MesaRepository`: Interface JPA (extiende `BaseRepository`).
- `MesaServiceImpl`: Lógica de negocio, incluye validaciones de disponibilidad (extiende `BaseServiceImpl`).
- `MesaController`: API pública para reservas (extiende `BaseController`).

### Flujo general
```
Cliente HTTP → MesaController → MesaServiceImpl → MesaRepository → BD
```

## 1. MesaController.
Controlador REST que expone los endpoints relacionados con las mesas.
### Endpoints disponibles:
- `put /api/v1/mesas/{id}/ocupar`: cuando en reserva se asigna una mesa, se cambia el estado indicando que esa mesa esta ocupada.
- `put /api/v1/mesas/{id}/liberar`: libera cada mesa que ya se haya pasado del limite por id.
- `put /api/v1/mesas/liberar-finalizadas`:
libera todas las mesas cuya fecha_fin ya se haya terminado.
- `POST /api/v1/mesas/{id}/disponible`:revisa si la mesa esta disponible.

## 2. `Mesas.java`
Entidad que representa a las mesas.

### Atributos:

- `numero`: numero de cada mesa.
- `capacidad`: capacidad que tiene la mesa.
- `ubicacion`:indica en que seccion de la cafeteria se quiere sentar.
- `estado`: indica si esta disponible o ocupado.
- `precio`:el valor que tiene al reservar la mesa.
## 3. `IMesaRepository.java`

Repositorio JPA para la entidad ` Mesa`. Provee métodos CRUD heredados de la base.

## 4. `IMesaService.java`
implementacion del servicio donde se maneja la logica y los metodos con una extension hacia la base.
## metodos que se implementaran:

- public void ocuparMesa(Long idMesa);
- public boolean estaDisponible(Long idMesa);
- public void liberarMesa(Long idMesa);

## 5. `MesaService.java`

implementacion del Servicio con la lógica de negocio para el manejo de las mesas en la reserva.
- ` ocuparMesa(Long idMesa)`:metodo para ocupar la mesa al reservarla. 
- `estaDisponible(Long idMesa)`:Metodo para verficiar la disponibilidad de las mesas.
- `liberarMesa(Long idMesa)`:Metodo para cambiar el estado de ocupado a disponible cuando la fecha_fin se haya terminado.



## modulo pago_reserva
### Funcionalidad
este modulo implementa el pago de la reserva para los clientes. A continuacion se documentan los archivos principales del modulo.
### Estructura
- `PagoReserva`: Entidad principal con campos como `metodo_pago`, `monto`, `reserva`, `users`, y un metodo:`calcularMontoDesdeReserva()`.
- `CarBuyDTO`: DTO con validaciones.
- `PagoReservaRepository`: Interface JPA (extiende `BaseRepository`).
- `PagoReservaServiceImpl`: Lógica de negocio, incluye validaciones de disponibilidad (extiende `BaseServiceImpl`).
- `PagoReservaController`: API pública para reservas (extiende `BaseController`).

### Flujo general
```
Cliente HTTP → PagoReservaController → PagoReservaServiceImpl → PagoReservaRepository → BD
```

## 1. PagoReservaController.
Controlador REST que expone los endpoints relacionados con el pago de las reservas.
### Endpoints disponibles:
- `POST /api/v1/pago/reserva/add`: peticion de agregar un nuevo pago reserva.
- `GET /api/v1/pago/reserva/by-codigo`: obtener pago reserva por codigo.

## 2. `PagoReserva.java`
Entidad que representa al PagoReserva.

### Atributos:

- `metodo_pago`:metodo de pago de los clientes.
- `monto`:monto para la reservacion.
- `reserva`: relacion llave foranea con la entidad Reserva.
- `users`:Relacion llave foranea con la entidad users .
- `calcularMontoDesdeReserva()`:metodo para automazatizar el monto segun las fechas y el precio.

## 3. `IPagoReservaRepository.java`

Repositorio JPA para la entidad `PagoReserva`. Provee métodos CRUD heredados de la base y un metodo para conexion con los servicios.
### metodo:
- `List<PagoReserva> findByReservaCodi(String codigo);`

## 4. `IPagoReservaService.java`

Clase auxiliar para el manejo de solicitudes de PagoReserva.
### metodos aplicados:
- `PagoReserva save(PagoReserva pagoReserva);`metodo para calcular aumtomaticamente el monto y se guarda en ese atributo.
- ` List<PagoReserva> findByReservaCodigo(String codigo);`:metodo para encontrar por codigo el pagoReserva.
## 5 PagoReservaService:
implmentacion del Servicio con la lógica de negocio para el manejo de los pagos de la reserva.

- `PagoReserva save(PagoReserva pagoReserva)`.

- `List<PagoReserva> findByReservaCodigo(String codigo)`.

## BackendCaffeNetApplication
```
 @OpenAPIDefinition(
	info = @Info(title = "BackendPM API", version = "v1"),
	servers = {
		@Server(url = "https://7s68n3g8-9000.use2.devtunnels.ms")
	}
)
```
####  configuracion y enriquecimineto de la documentación Swagger/OpenAPI que se genera automáticamente a partir de los controladores.

- `@OpenAPIDefinition:` Contenedor principal. Agrupa metadatos que complementan lo que el scanner infiere de los controladores Spring.

- `info = @Info(...):`se Define la sección Info del documento OpenAPI: título, descripción, versión, términos de servicio, contacto, licencias, etc. Aquí se establece title = "BackendPM API" y version = "v1".

- `servers = { @Server(...) }:`	Lista de entornos donde se aloja la API. Al añadir url, Swagger UI mostrará ese host como destino base para probar llamadas. Útil cuando tu app corre detrás de túneles ngrok/devtunnels o en múltiples stages (dev, qa, prod).

