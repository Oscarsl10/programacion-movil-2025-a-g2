# Historia de Usuario 14: Gestión de usuarios y perfiles

## Información General

- **Número:** 14
- **Usuario:** Jesús Ariel Bonilla
- **Nombre:** Gestión de usuarios y perfiles
- **Prioridad en negocio:** Alta
- **Riesgo en desarrollo:** Medio
- **Tiempo estimado:** 1 semana
- **Iteración asignada:** 14
- **Programadores responsables:**  
  Karen Johana Caicedo Arias, Nicolas Obregón Rojas, Yeferson Esmid Heredia, Oscar Guillermo Sierra Lozano

## Flujo de Usuario

1. **Administrador** accede a la sección de usuarios:
   - Visualiza la lista de usuarios.
   - Puede editar datos o iniciar recuperación de contraseña para cualquier usuario.

2. **Administrador/Usuario** accede a su perfil:
   - Visualiza y edita sus datos personales.
   - Puede cambiar su contraseña.

3. **Recuperación de contraseña:**
   - Desde la pantalla de login, selecciona “¿Olvidaste tu contraseña?”.
   - Ingresa su correo



Como **administrador**, puedo ver y editar los datos de cualquier usuario registrado.  
Tanto **administrador** como **usuarios** pueden visualizar y actualizar su propio perfil (nombre, teléfono, contraseña) y recuperar su contraseña mediante un flujo de “¿Olvidaste tu contraseña?”.

---

## Criterios de Aceptación

### Administrador

- **Listar todos los usuarios** con su información básica (nombre, correo, teléfono).
- **Editar datos de usuario**: nombre, teléfono y rol.
- **Recuperar contraseña** de cualquier usuario desde la administración.

### Administrador y Usuario

- **Visualizar y editar el propio perfil**: nombre, teléfono y contraseña.
- **Cambiar la contraseña** desde el perfil.
- **Flujo “¿Olvidaste tu contraseña?”**:  
  - Solicita el correo electrónico.
  - Si existe, envía una contraseña temporal.
  - Permite cambiarla por una nueva y segura.

---

## Implementación

### 1. Listado y Edición de Usuarios (Administrador)

- **Pantalla:** `usuarios-admin.page.html`  
  Muestra una lista de usuarios con opciones para editar y recuperar contraseña.
- **Código relevante:**  
  - Listado y edición: [`admin/usuarios-admin/usuarios-admin.page.ts`](../../admin/usuarios-admin/usuarios-admin.page.ts)
  - Vista: [`admin/usuarios-admin/usuarios-admin.page.html`](../../admin/usuarios-admin/usuarios-admin.page.html)

#### Ejemplo de interfaz:
- Listado de usuarios con nombre, correo y teléfono.
- Botón "Editar" para modificar datos.
- Botón "Recuperar Contraseña" para iniciar el flujo de recuperación.

### 2. Edición de Perfil (Administrador y Usuario)

- **Pantalla:** `profile-admin` y `profile`  
  Permite visualizar y editar nombre, teléfono y contraseña.
- **Campos editables:**  
  - Nombre completo
  - Teléfono
  - Contraseña (con validación y confirmación)

### 3. Cambio y Recuperación de Contraseña

- **Desde el perfil:**  
  Opción para cambiar la contraseña actual por una nueva.
- **¿Olvidaste tu contraseña?:**  
  - Solicita el correo electrónico.
  - Si el correo existe, se envía una contraseña temporal.
  - El usuario debe cambiar la contraseña temporal por una nueva segura.
- **Código relevante:**  
  - Flujo de recuperación: [`admin/login-admin/login.page.ts`](../../admin/login-admin/login.page.ts)

---

## Flujo de Usuario

1. **Administrador** accede a la sección de usuarios:
   - Visualiza la lista de usuarios.
   - Puede editar datos o iniciar recuperación de contraseña para cualquier usuario.

2. **Administrador/Usuario** accede a su perfil:
   - Visualiza y edita sus datos personales.
   - Puede cambiar su contraseña.

3. **Recuperación de contraseña:**
   - Desde la pantalla de login, selecciona “¿Olvidaste tu contraseña?”.
   - Ingresa su correo

---

## Ejemplo de Código Backend (Java Spring Boot)

A continuación se muestran ejemplos simplificados de controladores y servicios para la gestión de usuarios y recuperación de contraseña, basados en la estructura del backend del proyecto.

### 1. Listar usuarios (Administrador)

````java
@RestController
@RequestMapping("/api/usuarios")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserDto> listarUsuarios() {
        return userService.findAll();
    }
}
````

### Editar perfil de usuario
````java
@PutMapping("/{id}")
public ResponseEntity<UserDto> actualizarPerfil(@PathVariable Long id, @RequestBody UserDto datos) {
    UserDto actualizado = userService.update(id, datos);
    return ResponseEntity.ok(actualizado);
}
````

### Recuperar contraseña (“¿Olvidaste tu contraseña?”)
````java
@PostMapping("/recuperar-contrasena")
public ResponseEntity<?> recuperarContrasena(@RequestBody Map<String, String> request) {
    String email = request.get("email");
    boolean enviado = userService.enviarContrasenaTemporal(email);
    if (enviado) {
        return ResponseEntity.ok("Contraseña temporal enviada al correo.");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Correo no encontrado.");
    }
}
````

### Servicio para enviar contraseña temporal
````java
public boolean enviarContrasenaTemporal(String email) {
    Optional<User> userOpt = userRepository.findByEmail(email);
    if (userOpt.isPresent()) {
        String tempPassword = generarContrasenaTemporal();
        User user = userOpt.get();
        user.setPassword(passwordEncoder.encode(tempPassword));
        userRepository.save(user);
        emailService.sendPasswordResetEmail(user.getEmail(), tempPassword);
        return true;
    }
    return false;
}
````

## Ejemplo de Código Frontend

### Listar usuarios (Administrador)

````javascript
async function listarUsuarios() {
  const response = await fetch('/api/usuarios');
  return await response.json();
}

````
### Editar perfil de usuario

````javascript
async function actualizarPerfil(usuarioId, datos) {
  const response = await fetch(`/api/usuarios/${usuarioId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return await response.json();
}
````

#### Recuperar contraseña (“¿Olvidaste tu contraseña?”)

````javascript
async function recuperarContrasena(email) {
  const response = await fetch('/api/auth/recuperar-contrasena', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return await response.json();
}
````