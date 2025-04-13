
#  Documentación del Backend 

##  Estructura General

Este backend utiliza el **framework Spring Boot** y sigue un patrón de diseño **genérico y modular**, facilitando la reutilización de código, la escalabilidad y el mantenimiento del sistema. Se basa principalmente en los principios de programación orientada a objetos y buenas prácticas como la separación de responsabilidades.

---

##  Flujo General del Backend

```
Cliente HTTP → Controller → Service → Repository → Base de Datos
                       ↑
                    DTO (ApiResponseDto)
```

---

##  Paquetes Principales

### `com.corhuila.AgendaManager.Entity`

Contiene las entidades del modelo de dominio.

#### `ABaseEntity`

Es una **clase abstracta base** para todas las entidades, que incluye atributos comunes de auditoría y control:

- `id`: Identificador único.
- `status`: Estado lógico de la entidad.
- `createdAt`, `updatedAt`, `deletedAt`: Tiempos de auditoría.
- `createdBy`, `updatedBy`, `deletedBy`: Usuarios responsables de las acciones.
- `codeAuth`: Control adicional de autorización.

> Todas las entidades concretas deben heredar de esta clase.

---

### `com.corhuila.AgendaManager.IRepository`

Contiene las interfaces de acceso a datos.

#### `IBaseRepository`

Extiende `JpaRepository`, proporcionando operaciones CRUD para cualquier entidad que herede de `ABaseEntity`.

---

### `com.corhuila.AgendaManager.IService`

Define los contratos de servicios genéricos.

#### `IBaseService<T extends ABaseEntity>`

Interface con métodos genéricos para manejar entidades:

```java
List<T> all();
List<T> findByStateTrue();
T findById(Long id) throws Exception;
T save(T entity) throws Exception;
void update(Long id, T entity) throws Exception;
void delete(Long id) throws Exception;
```

---

### `com.corhuila.AgendaManager.Service`

Implementación de la lógica de negocio.

#### `ABaseService<T extends ABaseEntity>`

Clase abstracta que implementa `IBaseService`, centralizando la lógica CRUD:

- **`save`**: Establece `createdAt` y `createdBy` antes de guardar.
- **`update`**: Valida existencia, evita modificar campos auditables como `createdAt`.
- **`delete`**: Realiza borrado lógico (`deletedAt`, `deletedBy`), no físico.

> Requiere implementar `getRepository()` para que cada clase concreta especifique su repositorio.

---

### `com.corhuila.AgendaManager.Controller`

Encapsula la lógica de enrutamiento y control de peticiones HTTP.

#### `ABaseController<T, S>`

Clase abstracta que maneja rutas REST de forma genérica:

- `GET /`: Retorna todos los registros activos.
- `GET /{id}`: Busca por ID.
- `POST /`: Guarda un nuevo registro.
- `PUT /{id}`: Actualiza un registro.
- `DELETE /{id}`: Borra lógicamente un registro.

---

### `com.corhuila.AgendaManager.Dto`

Contiene clases para la comunicación entre el backend y el cliente.

#### `ApiResponseDto<T>`

Envuelve las respuestas HTTP de forma estándar:

- `status`: Éxito o error.
- `data`: Información solicitada.
- `message`: Mensaje descriptivo.

---

##  Principios y Buenas Prácticas Aplicadas

- **Genericidad**: Se reduce la duplicación de código al manejar múltiples entidades a través de clases y servicios genéricos.
- **Borrado lógico**: Mejora la trazabilidad de datos históricos.
- **Auditoría**: Se registra quién y cuándo se realizaron acciones en los datos.
- **Separación de responsabilidades**:
  - Controllers: Gestionan solicitudes HTTP.
  - Services: Procesan lógica de negocio.
  - Repositories: Acceden a la base de datos.

---

##  Extensión del Sistema

Para crear un nuevo recurso (por ejemplo: `User`):

1. Crear la entidad `User` que herede de `ABaseEntity`.
2. Crear `IUserRepository` que extienda `IBaseRepository<User, Long>`.
3. Crear `UserService` que extienda `ABaseService<User>` e implemente `getRepository()`.
4. Crear `UserController` que extienda `ABaseController<User, UserService>`.
5. Configurar rutas en el controller con `@RequestMapping`.

---