
# HU-16 - Gestión de pagos y comprobantes

**Como** administrador del sistema **Quiero** poder generar y consultar comprobantes de pago de las reservas **Para** verificar que los pagos fueron realizados correctamente y llevar control de la facturación,Como **administrador**, quiero **registrar el pago de una reserva** mediante un código único proporcionado al usuario y un método de pago, de forma que pueda **generar la factura correspondiente** y **consultar el historial de pagos realizados** por los usuarios.

###  Criterios de Aceptación

| Criterio | Descripción | Cumplimiento |
|---------|-------------|--------------|
| 1 | El sistema debe permitir generar un comprobante de pago desde un pago realizado |  Implementado con `/api/v1/comprobante_reserva/generar` |
| 2 | El comprobante debe estar asociado a la reserva, al usuario y al pago |  Relaciones establecidas en el `Comprobante_reservaController` |
| 3 | Se debe poder consultar un comprobante por el ID del pago |  Endpoint `/by-pago/{pagoId}` |
| 4 | El método de pago debe estar incluido (heredado del pago) |  Atributo `metodoPago` en `PagoReserva`, enlazado en `Comprobante_reserva` |

---

###  Entidades y Relaciones

- `PagoReserva` contiene:
  - `metodoPago`, `montoPago`, `reserva`, `users`
- `Comprobante_reserva` contiene:
  - `fecha_emision`
  - `pagoReserva`: relación con el pago realizado
  - `reserva`: relación con la reserva asociada
  - `users`: relación con el usuario que pagó

---

###  Flujo de Generación de Comprobante

1. El usuario realiza un pago de reserva (`PagoReserva`).
2. El sistema registra el pago con el método y monto correspondientes.
3. Se genera un comprobante mediante el endpoint:

```http
POST /api/v1/comprobante_reserva/generar?pagoId={id}
```

4. El comprobante generado incluye automáticamente:
   - Fecha de emisión
   - Usuario
   - Reserva
   - Detalles del pago

---

###  Consulta de Comprobante

```http
GET /api/v1/comprobante_reserva/by-pago/{pagoId}
```

- Devuelve el comprobante asociado a ese pago si existe.
- En caso de error o inexistencia, responde con mensaje claro de error.

---

###  Ejemplo de respuesta

```json
{
  "message": "Comprobante generado exitosamente",
  "data": {
    "id": 45,
    "fecha_emision": "2025-05-20T12:34:56Z",
    "pagoReserva": {
      "id": 33,
      "metodoPago": "Tarjeta Crédito",
      "montoPago": 18000
    },
    "reserva": {
      "codigo": "RSV-0009"
    },
    "users": {
      "email": "cliente@caffenet.com"
    }
  },
  "success": true
}
```
---

###  Código 

#### `Comprobante_reservaController.java`

```java
@PostMapping("/generar")
public ResponseEntity<ApiResponseDto<Comprobante_reserva>> generarComprobante(@RequestParam Long pagoId) {
    PagoReserva pago = pagoReservaRepository.findById(pagoId)
        .orElseThrow(() -> new RuntimeException("Pago no encontrado"));

    Comprobante_reserva comprobante = new Comprobante_reserva();
    comprobante.setFecha_emision(new Date());
    comprobante.setPagoReserva(pago);
    comprobante.setReserva(pago.getReserva());
    comprobante.setUsers(pago.getUsers());

    Comprobante_reserva creado = service.save(comprobante);
    return ResponseEntity.ok(new ApiResponseDto<>("Comprobante generado exitosamente", creado, true));
}
```



## Criterios de Aceptación

1. El sistema debe permitir ingresar un **código único de reserva** proporcionado al momento de realizar la reserva.
2. El sistema debe buscar la **reserva relacionada al código** ingresado.
3. El sistema debe permitir asignar el **correo del usuario** que realiza el pago.
4. El sistema debe permitir seleccionar el **método de pago** (por ejemplo: efectivo, tarjeta, transferencia).
5. El sistema debe calcular automáticamente el **monto a pagar** basado en los datos de la reserva.
6. El sistema debe almacenar los datos del pago de la reserva en el sistema.
7. El sistema debe permitir consultar el **historial de pagos** asociados a un código de reserva.
8. El sistema debe devolver mensajes de error claros si no se encuentra la reserva o el usuario.


## Endpoints Relacionados

### Crear un nuevo pago de reserva

`POST /api/v1/pago/reserva/add`

**Request Body:**
```json
{
  "reserva": { "id": 1 },
  "users": { "email": "usuario@ejemplo.com" },
  "metodoPago": "Tarjeta"
}
```

**Descripción:**
- Se realiza la creación del pago de una reserva.
- Se asigna correctamente la relación con la reserva y el usuario.
- Se calcula automáticamente el monto de pago llamando al método `calcularMontoDesdeReserva()` desde el `PagoReservaService`.
- El nuevo pago es almacenado en la base de datos.

**Response:**
- Código `201 Created` y objeto `PagoReserva` registrado.

---

### Consultar pagos por código de reserva

`GET /api/v1/pago/reserva/by-codigo?codigo=ABC123`

**Descripción:**
- Devuelve una lista de pagos realizados asociados al código único de la reserva proporcionado.

```
@GetMapping("/by-codigo")
    public ResponseEntity<List<PagoReserva>> getByReservaCodigo(@RequestParam String codigo) {
        List<PagoReserva> list = pagoReservaService.findByReservaCodigo(codigo);
        return ResponseEntity.ok(list);
    }

```
**Response:**
```json
[
  {
    "id": 5,
    "reserva": { "codigo": "ABC123" },
    "users": { "email": "usuario@ejemplo.com" },
    "monto": 50000.0,
    "metodoPago": "Tarjeta"
  }
]
```

---

## implementacion

### Cálculo del monto

```java
@Override
public PagoReserva save(PagoReserva pagoReserva) {
    pagoReserva.calcularMontoDesdeReserva(); // Se calcula automáticamente el monto
    return PagoReservaRepository.save(pagoReserva);
}
```

Este método sobrescrito en `PagoReservaService` asegura que cada vez que se registra un pago, el sistema calcule automáticamente el valor a pagar según los datos asociados a la reserva y los gaurda dentro del mismo monto.

### Asignación de relaciones

```java
Reserva reserva = reservaRepository.findById(pagoReserva.getReserva().getId())
        .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

Users usuario = usersRepository.findById(pagoReserva.getUsers().getEmail())
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

pagoReserva.setReserva(reserva);
pagoReserva.setUsers(usuario);
```

Esto garantiza que se valide la existencia de la reserva y el usuario antes de asociarlos al pago.

---



## Requisitos Técnicos

- Entidad `PagoReserva` con atributos como: `id`, `reserva`, `users`, `metodoPago`, `monto`.
- Relación con la entidad `Reserva` (por código) y con la entidad `Users` (por email).
- Métodos definidos en el `PagoReservaService` y `PagoReservaController`.
