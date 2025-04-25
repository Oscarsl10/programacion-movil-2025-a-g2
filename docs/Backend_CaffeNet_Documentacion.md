# Backend Base – CaffeNet

Este backend implementa una arquitectura genérica basada en controladores, servicios y repositorios reutilizables. La base está diseñada para facilitar el desarrollo de funcionalidades CRUD con auditoría y borrado lógico para cualquier entidad del sistema.

---

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
- `save(Users user)`: Guarda o actualiza un usuario.
- `verificarContrasenia(String rawPassword, String hashedPassword)`: Compara contraseñas en texto plano y encriptadas.
- `findAll()`: Lista todos los usuarios.

---

**Nota**: Este módulo también interactúa con `IAdminRepository` para evitar colisión de emails con administradores.