#  Guía de Estudio

## Pasos para la Configuración de Docker

1. **Preparar los Archivos**
   - Coloque los archivos `.env`, `Dockerfile` y `docker-compose.yml` en el mismo directorio.

2. **Construir la Imagen**
   - Utilice el siguiente comando para construir la imagen a partir del `Dockerfile`:
     ```sh
     docker build -t custom-mysql .
     ```

3. **Levantar el Contenedor**
   - Si desea actualizar la configuración o reconstruir la imagen, primero detenga el contenedor con el siguiente comando:
     ```sh
     docker-compose down
     ```
   - Luego, levante el contenedor y reconstruya la imagen utilizando:
     ```sh
     docker-compose up -d --build
     ```

4. **Acceso a MySQL**
   - Después de que el contenedor esté en ejecución, puede acceder a MySQL utilizando el cliente MySQL o cualquier otra herramienta de administración de bases de datos compatible.

## 5. Notas Adicionales

- Asegúrese de que Docker y Docker Compose estén instalados correctamente en su sistema antes de comenzar.
- Puede personalizar los archivos según los requisitos específicos de su proyecto.

##  Historias de Usuarios
Las historias de usuario son descripciones breves y simples de una funcionalidad desde la perspectiva del usuario final. Son fundamentales en metodologías ágiles como Scrum para definir los requerimientos de manera clara y comprensible.

###  Formato
Una historia de usuario sigue esta estructura:
> **Como** [tipo de usuario] **quiero** [acción o funcionalidad] **para** [beneficio o resultado esperado].

###  Características de una buena historia de usuario (INVEST)
- **I**ndependiente: No debe depender de otras historias.
- **N**egociable: Debe poder discutirse y ajustarse.
- **V**aliosa: Debe aportar valor al usuario.
- **E**stimable: Debe poder estimarse en términos de esfuerzo.
- **S**mall (Pequeña): Debe ser lo suficientemente pequeña para completarse en un sprint.
- **T**estable: Debe poder validarse con criterios de aceptación.

###  Ejemplo
> Como cliente, quiero agregar productos al carrito de compras para poder comprarlos fácilmente más tarde.

### 🔹 Criterios de aceptación
Los criterios de aceptación detallan las condiciones que debe cumplir la historia para considerarse terminada.
Ejemplo:
- El usuario puede agregar productos al carrito desde la página de detalles del producto.
- Se muestra una notificación de éxito después de agregar un producto.
- Los productos en el carrito se guardan hasta que el usuario cierre sesión.


##  Scrum
Scrum es un marco ágil para la gestión y desarrollo de proyectos. Se basa en iteraciones llamadas **sprints**, que suelen durar entre 1 y 4 semanas. Scrum fomenta la colaboración, la adaptación continua y la entrega frecuente de valor.

### 🔹 Roles en Scrum
- **Scrum Master**: Facilita el proceso y elimina obstáculos.
- **Product Owner**: Define las prioridades del producto y gestiona el Product Backlog.
- **Development Team**: Desarrolla y entrega el producto.

###  Eventos de Scrum
1. **Sprint Planning** – Planificación del sprint. Se seleccionan las historias de usuario que se trabajarán.
2. **Daily Scrum** – Reunión diaria de 15 minutos para sincronizar el equipo.
3. **Sprint Review** – Se muestra el trabajo terminado a los interesados y se recopilan comentarios.
4. **Sprint Retrospective** – Evaluación interna del equipo para mejorar en el siguiente sprint.

###  Artefactos en Scrum
- **Product Backlog** – Lista priorizada de funcionalidades y mejoras del producto.
- **Sprint Backlog** – Conjunto de tareas y funcionalidades seleccionadas para un sprint.
- **Incremento** – Resultado del sprint, que debe ser un producto funcional y potencialmente entregable.

###  Beneficios de Scrum
- Mayor flexibilidad y adaptación a cambios.
- Mejora la comunicación y colaboración en el equipo.
- Entrega continua de valor al usuario.
- Permite identificar y corregir problemas rápidamente.

---

##  Flujo Básico de Git
Git es un sistema de control de versiones distribuido que permite gestionar cambios en el código fuente de manera eficiente.

### 🔹 Pasos básicos
1. **Configurar Git** (solo la primera vez):
   ```sh
   git config --global user.name "Tu Nombre"
   git config --global user.email "tu@email.com"
   ```
2. **Inicializar un repositorio**:
   ```sh
   git init
   ```
3. **Clonar un repositorio**:
   ```sh
   git clone <url_del_repositorio>
   ```
4. **Agregar cambios al área de preparación**:
   ```sh
   git add .
   ```
5. **Confirmar los cambios**:
   ```sh
   git commit -m "Mensaje del commit"
   ```
6. **Subir los cambios al repositorio remoto**:
   ```sh
   git push origin main
   ```

---

##  Ramas en Git
Las ramas permiten desarrollar nuevas características sin afectar la versión principal.

### 🔹 Comandos básicos
- **Crear una nueva rama**:
  ```sh
  git branch nombre_rama
  ```
- **Cambiar a una rama existente**:
  ```sh
  git checkout nombre_rama
  ```
- **Crear y cambiar a una nueva rama**:
  ```sh
  git checkout -b nombre_rama
  ```
- **Fusionar una rama con main**:
  ```sh
  git checkout main
  git merge nombre_rama
  ```
- **Eliminar una rama**:
  ```sh
  git branch -d nombre_rama
  ```


##  Mockups
Los mockups son representaciones visuales de una interfaz de usuario antes de su desarrollo. Se encuentran en un nivel intermedio entre los wireframes (bocetos) y los prototipos funcionales.

### 🔹 Tipos de mockups
- **Mockups de baja fidelidad**: Bocetos simples con poca precisión en detalles.
- **Mockups de alta fidelidad**: Diseños más detallados, con colores, tipografía y estructura definitiva.

### 🔹 Herramientas populares para crear mockups
- **Figma** (https://www.figma.com/) – Diseño colaborativo en la nube.
- **Adobe XD** (https://www.adobe.com/products/xd.html) – Herramienta de diseño de interfaces.
- **Balsamiq** (https://balsamiq.com/) – Ideal para wireframes de baja fidelidad.
- **Sketch** (https://www.sketch.com/) – Enfocado en diseño de interfaces para macOS.

###  Beneficios de los mockups
- Permiten visualizar el diseño antes del desarrollo.
- Facilitan la comunicación entre diseñadores, desarrolladores y clientes.
- Ayudan a detectar problemas de usabilidad antes de escribir código.
- Sirven como referencia para el desarrollo frontend.