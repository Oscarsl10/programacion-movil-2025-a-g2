# Caffenet – Frontend (Ionic + Angular)

Caffenet es una aplicación híbrida construida con Ionic + Angular, diseñada para la gestión de productos, pedidos, reservas y usuarios en una cafetería. Está estructurada en módulos funcionales y orientada a la escalabilidad, utilizando buenas prácticas de separación de responsabilidades.

###  Tecnologías Usadas
- Framework principal: Ionic + Angular

- Lenguaje: TypeScript

- Estilos: SCSS con Ionic Components

- Gestión de rutas: Angular Modular Routing

- Comunicación con el backend: HttpClient centralizado vía api.service.ts


- Almacenamiento local: token.service.ts

- Arquitectura: Modular y basada en Core/Shared/Modules

### Estructura del Proyecto Frontend (CaffeNet)
El frontend del sistema CaffeNet sigue una estructura modular clara, organizada bajo los principios de separación de responsabilidades y reutilización de componentes.
````
app/
├── common/
│   ├── interfaces/         # Definición de interfaces comunes (DTOs, modelos)
│   └── services/           # Servicios reutilizables (API, autenticación, etc.)
│
├── core/
│   └── home/               # Página principal genérica de bienvenida
│       ├── home.page.html
│       ├── home.page.scss
│       └── home.page.ts
│
├── modules/
│   ├── admin/              # Módulo para funcionalidades del administrador
│   │   ├── home-admin/     
│   │   ├── login-admin/    
│   │   ├── products-admin/ 
│   │   ├── register-admin/ 
│   │   └── usuarios-admin/ 
│   │
│   └── user/               # Módulo para funcionalidades del usuario
│       ├── login/          
│       ├── mainmenu/       
│       └── register/       
│
├── shared/
│   └── components/         # Componentes reutilizables
│       ├── bottom-bar/     # Barra de navegación inferior
│       └── product-card/   # Tarjeta visual de productos
│
├── app.component.*         # Componente raíz de la app
├── app.config.ts           # Configuración de la app
└── app.routes.ts           # Definición de rutas principales

````

### Instalación y Ejecución
````
# Instalar dependencias
npm install

# Ejecutar en navegador
ionic serve

# Ejecutar en dispositivo Android (con Capacitor configurado)
ionic cap run android
````

### Rutas Principales

| Ruta|	Descripción|
|--------|--------|
|/login	|Inicio de sesión|
|/register|	Registro de usuario|
|/home|	Página principal|
|/productos	|Lista de productos|
|/reserva/crear	|Crear una nueva reserva|
|/pedido/detalle/:id|	Detalle de un pedido|

## Descripción de Carpetas Principales
### common/
Contiene elementos reutilizables a nivel global del proyecto:

- interfaces/: Define interfaces TypeScript compartidas (por ejemplo, User, Product, ApiResponseDto).

- services/: Incluye servicios genéricos como BaseService, AuthService, etc.

### core/
Contiene elementos esenciales del sistema como la página de inicio (home/) o layouts generales.

- modules/
Divide la aplicación según el tipo de usuario:

- admin/: Funcionalidades de gestión para administradores (productos, usuarios, login admin).

- user/: Funciones disponibles para usuarios finales como login, registro y navegación de productos.

### shared/components/
Componentes reutilizables entre diferentes vistas:

- bottom-bar/: Barra de navegación inferior que muestra accesos a secciones clave.

- product-card/: Tarjeta visual que presenta productos en listas o catálogos.




### Páginas de la Aplicación

#### Administrador
- **home-admin**: Accesos rápidos a gestión de usuarios y productos.
- **login-admin**: Ingreso exclusivo para administradores. Incluye recuperación de contraseña.
- **products-admin**: Visualización, creación, edición y eliminación de productos.
- **usuarios-admin**: Gestión y visualización de usuarios registrados.

#### Usuario
- **login**: Ingreso del usuario con opción de recuperación de contraseña.
- **mainmenu**: Vista principal del usuario con productos y barra de búsqueda.
- **register**: Registro de nuevos usuarios con opción para iniciar sesión.


#### Common
- Interfaces
    - api-response-dto.ts
     ````ts 
    export interface ApiResponseDto <T>{
    status: boolean;
    message: string;
    data: T;
    sucess: boolean;
    }
    ````
    - producto.ts
    ````ts
    export interface Producto {
    id?: number;
    nombre: string;
    descripcion: string;
    estado: string;
    status: boolean;
    precio: number;
    stock: number;
    }
    ````
    - usuario.ts
    ````ts
    export interface Usuario {
    email: string;
    full_name: string;
    password?: string; // opcional por seguridad
    telefono?: string;
    }
    ````
- Services
    - base.service.ts
    ````ts
    import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
    import { API_BASE_URL } from '../../api.config';
    import { ApiResponseDto } from '../interfaces/api-response-dto';
    import { Observable } from 'rxjs';


    export class BaseService<T> {
  
  protected apiUrl: string;

  constructor(protected http: HttpClient, endpoint: string) {
    this.apiUrl = `${API_BASE_URL}/${endpoint}`;
  }

  getAll(): Observable<ApiResponseDto<T[]>> {
    return this.http.get<ApiResponseDto<T[]>>(this.apiUrl);
  }

  getById(id: number): Observable<ApiResponseDto<T>> {
    return this.http.get<ApiResponseDto<T(`${this.apiUrl}/${id}`);
  }

    save(entity: T): Observable<ApiResponseDto<T>> {
    return this.http.post<ApiResponseDto<T>>(this.apiUrl,entity);
  }

  update(id: number, entity: T): Observable<ApiResponseDto<T>>  {
    return this.http.put<ApiResponseDto<T(`${this.apiUrl}/${id}`, entity);
    }

     delete(id: number): Observable<ApiResponseDto<T>> {
      return this.http.delete<ApiResponseDto<T>>`${this.apiUrl}/${id}`);
        }
    }
    ````
    - producto.service.ts
    ````ts
        import { Injectable } from '@angular/core';
    import { BaseService } from './base.service';
    import { Producto } from '../interfaces/producto';
    import { HttpClient } from '@angular/common/http';

    @Injectable({
    providedIn: 'root'
    })
    export class ProductoService extends BaseService<Producto> {
        constructor(http: HttpClient) {
        super(http, 'v1/producto'); 
        }
    }
    ````
    - usuario.service.ts
    ````ts
        import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Usuario } from '../interfaces/usuario'; 
    import { API_BASE_URL } from 'src/app/api.config';
    import { Observable } from 'rxjs';

    @Injectable({
    providedIn: 'root'
    })
    export class UsuarioService  {
    
        private apiUrl = `${API_BASE_URL}/user`; // Asegúrate de que la URL sea correcta para tu API

        constructor(private http: HttpClient) {}

        // Obtener todos los usuarios
        getAll(): Observable<Usuario[]> {
            return this.http.get<Usuario[]>(this.apiUrl);
        }

        // Obtener un usuario por su email
        getByEmail(email: string): Observable<Usuario> {
            return this.http.get<Usuario>(`${this.apiUrl}/getUser/${email}`);
        }

        // Actualizar la información del usuario
        updateUser(email: string, data: any): Observable<Usuario> {
            return this.http.put<Usuario>(`${this.apiUrl}/user/${email}`, data);
        }

        // Recuperar contraseña
        recuperarContrasenia(email: string): Observable<any> {
            return this.http.post(`${API_BASE_URL}/recuperar-contrasenia?email=${encodeURIComponent(email)}`, {});
        }
    }
    ````
#### api.config.ts
````ts
import { environment } from '../environments/environment';

const { apiHost, apiPort, apiPrefix } = environment;

export const API_BASE_URL =
  apiPort === '443'
    ? `${apiHost}${apiPrefix}`
    : `${apiHost}:${apiPort}${apiPrefix}`; 
````
#### Environment
- environment.prod.ts
````ts
export const environment = {
  production: true
};
````
- environment.ts
````ts
export const environment = {
  production: false,
  apiHost: 'http://localhost',
  apiPort: '8082',
  apiPrefix: '/api'
};

````
---

El frontend de CaffeNet, desarrollado con Ionic y Angular, representa una solución robusta, escalable y bien estructurada para la gestión integral de una cafetería. Gracias a su arquitectura modular, separación de responsabilidades y reutilización de componentes, la aplicación permite un mantenimiento sencillo y una evolución continua del sistema. Además, el uso de servicios centralizados y tipado estricto mediante interfaces garantiza una comunicación eficiente y segura con el backend.