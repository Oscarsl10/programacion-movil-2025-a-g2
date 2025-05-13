# Documentación de **ABaseController**

## **Descripción**
El `ABaseController` es una clase base que proporciona operaciones CRUD (`Create, Read, Update, Delete`) para cualquier entidad que extienda de `ABaseEntity` y que utilice un servicio que implemente `IBaseService<T>`.  
Las entidades como **Cliente, FechaHora, Mesa y Reserva** extienden esta funcionalidad, evitando la duplicación de código y asegurando una estructura uniforme.

## **Métodos en ABaseController**
Cada entidad que hereda de `ABaseController` usa los siguientes métodos predefinidos:

### **GET /api/v1/{entidad}**
Obtiene todos los registros activos de la entidad especificada.

### **GET /api/v1/{entidad}/{id}**
Obtiene un registro específico por su ID.

### **POST /api/v1/{entidad}**
Crea un nuevo registro con los datos proporcionados en el cuerpo de la solicitud.

### **PUT /api/v1/{entidad}/{id}**
Actualiza un registro existente.

### **DELETE /api/v1/{entidad}/{id}**
Elimina un registro específico por su ID.

---

## **Ejemplo de uso: ClienteController**
La entidad `Cliente` extiende de `ABaseController`, utilizando su funcionalidad para manejar clientes.

```java
package com.corhuila.parcial.Controller;

import com.corhuila.parcial.Entity.Cliente;
import com.corhuila.parcial.IService.IClienteService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:8100"})
@RestController
@RequestMapping("/api/v1/cliente")
public class ClienteController extends ABaseController<Cliente, IClienteService> {
    public ClienteController(IClienteService service) {
        super(service, "Cliente");
    }
}
```
El mismo enfoque se aplica a las entidades **FechaHora, Mesa y Reserva**, donde cada una hereda la funcionalidad del `ABaseController`, permitiendo la reutilización de código y la implementación eficiente de los métodos CRUD.

---

## **Entidades que consumen ABaseController**
Las siguientes entidades utilizan `ABaseController` para manejar sus operaciones:

- **Cliente** (`ClienteController`)
- **FechaHora** (`FechaHoraController`)
- **Mesa** (`MesaController`)
- **Reserva** (`ReservaController`)

Cada una de estas entidades hereda los métodos de `ABaseController`, garantizando una estructura organizada y evitando la redundancia en el código.

---

## **Conclusión**
El `ABaseController` actúa como un controlador genérico para todas las entidades, asegurando una implementación uniforme de los métodos CRUD. Esto mejora la mantenibilidad del código y agiliza el desarrollo de nuevas entidades dentro del sistema.




# Documentación del Reserva Controller

## **GET /api/v1/reserva/{id}**
Obtiene la información de una reserva específica por ID.

### **Parámetros**
- `id` *(integer, path parameter)* → ID de la reserva a consultar.

### **Ejemplo de respuesta**
```json
{
  "status": true,
  "data": {
    "id": 9007199254740991,
    "status": true,
    "createdAt": "2025-04-22T18:15:37.091Z",
    "updatedAt": "2025-04-22T18:15:37.091Z",
    "num_reserva": 1073741824,
    "cliente": {
      "id": 9007199254740991,
      "name": "string",
      "documento": "string"
    },
    "fecha_hora": {
      "id": 9007199254740991,
      "fecha_hora": "2025-04-22T18:15:37.091Z"
    },
    "mesa": {
      "id": 9007199254740991,
      "num_mesas": 1073741824
    }
  },
  "message": "string"
}
```
### **Código de respuesta**
`200 OK`

---

## **PUT /api/v1/reserva/{id}**
Actualiza una reserva existente.

### **Parámetros**
- `id` *(integer, path parameter)* → ID de la reserva a actualizar.

### **Ejemplo de cuerpo de solicitud**
```json
{
  "id": 9007199254740991,
  "status": true,
  "num_reserva": 1073741824,
  "cliente": {
    "id": 9007199254740991,
    "name": "string",
    "documento": "string"
  },
  "fecha_hora": {
    "id": 9007199254740991,
    "fecha_hora": "2025-04-22T18:15:36.996Z"
  },
  "mesa": {
    "id": 9007199254740991,
    "num_mesas": 1073741824
  }
}
```
### **Código de respuesta**
`200 OK`

---

## **DELETE /api/v1/reserva/{id}**
Elimina una reserva específica por ID.

### **Parámetros**
- `id` *(integer, path parameter)* → ID de la reserva a eliminar.

### **Código de respuesta**
`200 OK`

---

## **GET /api/v1/reserva**
Obtiene el listado de todas las reservas sin parámetros de entrada.

### **Ejemplo de respuesta**
```json
{
  "status": true,
  "data": [
    {
      "id": 9007199254740991,
      "num_reserva": 1073741824,
      "cliente": {
        "id": 9007199254740991,
        "name": "string",
        "documento": "string"
      },
      "fecha_hora": {
        "id": 9007199254740991,
        "fecha_hora": "2025-04-22T18:15:37.107Z"
      },
      "mesa": {
        "id": 9007199254740991,
        "num_mesas": 1073741824
      }
    }
  ],
  "message": "string"
}
```
### **Código de respuesta**
`200 OK`

---

# Documentación del Mesa Controller

## **PUT /api/v1/mesa/{id}**
Actualiza la información de una mesa.

### **Ejemplo de cuerpo de solicitud**
```json
{
  "id": 9007199254740991,
  "num_mesas": 1073741824
}
```
### **Código de respuesta**
`200 OK`

---

## **DELETE /api/v1/mesa/{id}**
Elimina una mesa específica por ID.

### **Código de respuesta**
`200 OK`

# Documentación del Mesa Controller

## **GET /api/v1/mesa**
Obtiene el listado de todas las mesas sin parámetros de entrada.

### **Ejemplo de respuesta**
```json
{
  "status": true,
  "data": [
    {
      "id": 9007199254740991,
      "num_mesas": 1073741824
    }
  ],
  "message": "string"
}
```
### **Código de respuesta**
`200 OK`

---

## **POST /api/v1/mesa**
Registra una nueva mesa.

### **Ejemplo de cuerpo de solicitud**
```json
{
  "id": 9007199254740991,
  "num_mesas": 1073741824
}
```
### **Código de respuesta**
`200 OK`

---

# Documentación del Fecha Hora Controller

## **GET /api/v1/fecha_hora/{id}**
Obtiene la información de una fecha y hora específica por ID.

### **Parámetros**
- `id` *(integer, path parameter)* → ID de la fecha y hora a consultar.

### **Ejemplo de respuesta**
```json
{
  "status": true,
  "data": {
    "id": 9007199254740991,
    "fecha_hora": "2025-04-22T18:23:03.974Z"
  },
  "message": "string"
}
```
### **Código de respuesta**
`200 OK`

---

## **PUT /api/v1/fecha_hora/{id}**
Actualiza una fecha y hora existente.

### **Ejemplo de cuerpo de solicitud**
```json
{
  "id": 9007199254740991,
  "fecha_hora": "2025-04-22T18:23:03.978Z"
}
```
### **Código de respuesta**
`200 OK`

---

## **DELETE /api/v1/fecha_hora/{id}**
Elimina una fecha y hora específica por ID.

### **Código de respuesta**
`200 OK`

---

## **GET /api/v1/fecha_hora**
Obtiene el listado de todas las fechas y horas sin parámetros de entrada.

### **Ejemplo de respuesta**
```json
{
  "status": true,
  "data": [
    {
      "id": 9007199254740991,
      "fecha_hora": "2025-04-22T18:23:03.990Z"
    }
  ],
  "message": "string"
}
```
### **Código de respuesta**
`200 OK`

---

## **POST /api/v1/fecha_hora**
Registra una nueva fecha y hora.

### **Ejemplo de cuerpo de solicitud**
```json
{
  "id": 9007199254740991,
  "fecha_hora": "2025-04-22T18:23:03.996Z"
}
```
### **Código de respuesta**
`200 OK`

---

# Documentación del Cliente Controller

## **GET /api/v1/cliente/{id}**
Obtiene la información de un cliente específico por ID.

### **Parámetros**
- `id` *(integer, path parameter)* → ID del cliente a consultar.

### **Ejemplo de respuesta**
```json
{
  "status": true,
  "data": {
    "id": 9007199254740991,
    "name": "string",
    "documento": "string"
  },
  "message": "string"
}
```
### **Código de respuesta**
`200 OK`

---

## **PUT /api/v1/cliente/{id}**
Actualiza un cliente existente.

### **Ejemplo de cuerpo de solicitud**
```json
{
  "id": 9007199254740991,
  "name": "string",
  "documento": "string"
}
```
### **Código de respuesta**
`200 OK`

---

## **DELETE /api/v1/cliente/{id}**
Elimina un cliente específico por ID.

### **Código de respuesta**
`200 OK`

---

## **GET /api/v1/cliente**
Obtiene el listado de todos los clientes sin parámetros de entrada.

### **Ejemplo de respuesta**
```json
{
  "status": true,
  "data": [
    {
      "id": 9007199254740991,
      "name": "string",
      "documento": "string"
    }
  ],
  "message": "string"
}
```
### **Código de respuesta**
`200 OK`

---

## **POST /api/v1/cliente**
Registra un nuevo cliente.

### **Ejemplo de cuerpo de solicitud**
```json
{
  "id": 9007199254740991,
  "name": "string",
  "documento": "string"
}
```
### **Código de respuesta**
`200 OK`