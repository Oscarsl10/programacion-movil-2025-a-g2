# HU: Gestión de Mesas y Reservas

## Descripción

Como **administrador**, puedo crear, editar, eliminar y liberar mesas con sus atributos (número, capacidad, ubicación, precio por hora, estado) y ver las reservas en curso.  
Como **usuario**, puedo reservar mesas seleccionando fechas, código único, número de personas y mesa disponible, con validación de capacidad y cálculo dinámico del costo.

---

## Criterios de Aceptación y Soporte en el Backend

### Administrador

#### 1. Crear, editar, eliminar y liberar mesas

- **Entidad:** `Mesa`
  - Atributos: `numero`, `capacidad`, `ubicacion`, `precio`, `estado`
- **Controlador:** `MesaController`
- **Servicio:** `MesaService`
- **Endpoints:**
  - `POST /api/v1/mesas` — Crear mesa
  - `PUT /api/v1/mesas/{id}` — Editar mesa
  - `DELETE /api/v1/mesas/{id}` — Eliminar mesa
  - `PUT /api/v1/mesas/{id}/liberar` — Liberar mesa (cambia estado a DISPONIBLE)
  - `PUT /api/v1/mesas/{id}/ocupar` — Ocupar mesa (cambia estado a OCUPADO)

#### 2. Listar todas las mesas y reservas en curso

- **Listar mesas:**  
  - `GET /api/v1/mesas` — Devuelve todas las mesas con sus atributos y estado actual.
- **Listar reservas:**  
  - `GET /api/v1/reserva` — Devuelve todas las reservas, incluyendo las activas/en curso.

---

### Usuario

#### 3. Seleccionar fecha de inicio y fin de la reserva

- **Entidad:** `Reserva`
- **Controlador:** `ReservaController`
- **Servicio:** `ReservaService`
- **Endpoint:**  
  - `POST /api/v1/reserva/addReservation` — Crea una reserva con fechas de inicio y fin.

#### 4. Ingresar un código único para la reserva

- El campo `codigo` en la entidad `Reserva` es requerido y único.
- El backend valida que el código no se repita.

#### 5. Especificar el número de personas y validar capacidad

- El campo `numero_personas` en `Reserva`.
- **Validación en backend:**  
  - Antes de crear la reserva, el servicio verifica que `numero_personas` no exceda la `capacidad` de la mesa seleccionada.
  - Si excede, lanza un error y no permite la reserva.

#### 6. Elegir entre las mesas disponibles

- El endpoint `GET /api/v1/mesas` permite al frontend filtrar solo las mesas con `estado = DISPONIBLE`.
- El backend también valida que la mesa seleccionada esté disponible al momento de reservar.

#### 7. Cálculo dinámico del precio total

- El precio total de la reserva se calcula en el backend:
  - Fórmula:  
    `precio_total = (fechaFin - fechaInicio en horas) * precio por hora de la mesa`
- Implementado en la lógica de la entidad o servicio de reserva.

---

## Ejemplo de flujo de reserva (usuario)

1. El usuario consulta mesas disponibles (`GET /api/v1/mesas`).
2. Selecciona fecha/hora inicio y fin, número de personas, código y mesa.
3. El frontend envía la reserva al backend (`POST /api/v1/reserva/addReservation`).
4. El backend valida:
   - Que la mesa esté disponible.
   - Que la capacidad no sea superada.
   - Que el código sea único.
   - Calcula el precio total.
5. Si todo es correcto, crea la reserva y marca la mesa como OCUPADA.

---

## Ejemplo de respuesta JSON de reserva

```json
{
  "id": 12,
  "fechaInicio": "2025-06-01T18:00:00",
  "fechaFin": "2025-06-01T20:00:00",
  "numero_personas": 4,
  "codigo": "RESV1234",
  "mesa": {
    "id": 3,
    "numero": 5,
    "capacidad": 4,
    "ubicacion": "Terraza",
    "precio": 15000,
    "estado": "OCUPADO"
  },
  "users": {
    "email": "cliente@correo.com"
  },
  "estado": "ACTIVA",
  "precio": 30000
}