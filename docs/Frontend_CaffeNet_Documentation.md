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
src/
├── app/
│   ├── common/                 # Funcionalidades reutilizables
│   │   ├── guards/            # Guards de rutas (Auth, Role, etc.)
│   │   ├── interfaces/        # Interfaces TypeScript compartidas
│   │   └── services/          # Servicios inyectables
│   ├── core/
│   │   └── home/              # Página principal
│   │       ├── home.page.html
│   │       ├── home.page.scss
│   │       └── home.page.ts
│   ├── modules/               # Módulos funcionales
│   │   ├── admin/             # Módulo para administración
│   │   ├── guest/             # Módulo para usuarios invitados
│   │   │   └── mainmenu-guest.page.*
│   │   └── user/              # Módulo para usuarios registrados
│   │       ├── cart/
│   │       ├── detail-order/
│   │       ├── login/
│   │       ├── mainmenu/
│   │       ├── profile/
│   │       └── register/
│   ├── reservations/          # Reservaciones u órdenes
│   ├── shared/components/     # Componentes reutilizables
│   │   ├── admin/
│   │   ├── guest/
│   │   ├── product-card/
│   │   └── user/
│   ├── api.config.ts          # Configuración de API (URLs, endpoints)
│   ├── app.component.*        # Componente raíz
│   └── app.routes.ts          # Rutas principales de la app
├── assets/
│   └── icon/
│       └── shapes.svg         # Iconos o recursos gráficos
└── environments/              # Variables de entorno

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
##  Configuración
API Base URL: Configurada en api.config.ts.  

Variables de entorno en /src/environments/.

##  Estructura General

- `common/`: Contiene guards, interfaces y servicios reutilizables en toda la aplicación.
- `core/`: Contiene la página principal (`home`).
- `modules/`: Agrupa los módulos por tipo de usuario o función.
  - `admin/`: Módulo para funcionalidades administrativas.
  - `guest/`: Módulo para invitados (usuarios no registrados).
  - `user/`: Módulo para usuarios registrados (login, perfil, carrito, etc).
- `reservations/`: Módulo para el manejo de reservas.
- `shared/components/`: Componentes reutilizables compartidos entre módulos.
- `assets/`: Archivos estáticos como imágenes e íconos.
- `environments/`: Variables de entorno (`environment.ts`, `environment.prod.ts`).

## Rutas principales:
| Ruta                  | Descripción                                              |
| --------------------- | -------------------------------------------------------- |
| `/login`              | Inicio de sesión del usuario                             |
| `/register`           | Registro de un nuevo usuario                             |
| `/home`               | Página principal de la aplicación                        |
| `/mainmenu`           | Menú principal del usuario autenticado                   |
| `/mainmenu-guest`     | Menú principal para usuarios invitados                   |
| `/productos`          | Listado de productos disponibles                         |
| `/cart`               | Vista del carrito de compras                             |
| `/profile`            | Perfil del usuario registrado                            |
| `/reserva/crear`      | Crear una nueva reserva                                  |
| `/pedido/detalle/:id` | Detalle de un pedido específico                          |
| `/admin`              | Vista principal del administrador (puede tener subrutas) |


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
### Modelo ts de cada pages de Admin

#### admin-reservations.ts 
````ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BottomBarAdminComponent } from 'src/app/shared/components/admin/bottom-bar-admin/bottom-bar-admin.component';
import { Reserva } from 'src/app/common/interfaces/admin/reserva';
import { Mesa } from 'src/app/common/interfaces/admin/mesa';
import { MesaService } from 'src/app/common/services/mesa.service';
import { ReservaService } from 'src/app/common/services/reserva.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-reservations',
  templateUrl: './admin-reservations.page.html',
  styleUrls: ['./admin-reservations.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, BottomBarAdminComponent, FormsModule]
})
export class AdminReservationsPage implements OnInit {
    mesas: Mesa[] = [];
    reservas: Reserva[] = [];

    nuevaMesa: Mesa = { numero: 0, capacidad: 0, ubicacion: '', precio: 0, estado: 'DISPONIBLE' };
    editando = false;

    constructor(
        private mesaService: MesaService,
        private reservaService: ReservaService
    ) {}

    ngOnInit() {
        this.cargarMesas();
        this.cargarReservas();
    }

    cargarMesas() {
        this.mesaService.getAll().subscribe(res => this.mesas = res.data);
    }

    cargarReservas() {
        this.reservaService.getAll().subscribe(res => this.reservas = res.data);
    }

    guardarMesa() {
        if (this.editando && this.nuevaMesa.id) {
        this.mesaService.update(this.nuevaMesa.id, this.nuevaMesa)
            .subscribe(() => this.onSaveSuccess());
        } else {
        this.mesaService.save(this.nuevaMesa)
            .subscribe(() => this.onSaveSuccess());
        }
    }

    private onSaveSuccess() {
        this.resetFormulario();
        this.cargarMesas();
    }

    editarMesa(mesa: Mesa) {
        this.nuevaMesa = { ...mesa };
        this.editando = true;
    }

    eliminarMesa(id: number) {
        this.mesaService.delete(id).subscribe(() => this.cargarMesas());
    }

    ocuparMesa(mesa: Mesa) {
        this.mesaService.ocuparMesa(mesa.id!)
        .subscribe(() => this.cargarMesas());
    }

    liberarMesa(mesa: Mesa) {
        this.mesaService.liberarMesa(mesa.id!)
        .subscribe(() => this.cargarMesas());
    }

    resetFormulario() {
        this.nuevaMesa = { numero: 0, capacidad: 0, ubicacion: '', precio: 0, estado: 'DISPONIBLE' };
        this.editando = false;
    }
}

````
#### facturation-admin.ts 
````ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthAdminService } from 'src/app/common/services/authAdminService';
import { BottomBarAdminComponent } from 'src/app/shared/components/admin/bottom-bar-admin/bottom-bar-admin.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-facturation-admin',
  templateUrl: './facturation-admin.page.html',
  styleUrls: ['./facturation-admin.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, BottomBarAdminComponent], 
})
export class FacturationAdminPage implements OnInit {

    constructor(private authAdminService: AuthAdminService) { }

    ngOnInit() {
        this.authAdminService.requireLogin(); // Verifica si el usuario está logueado
    }
}
````
#### home-admin.ts
````ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MainmenuComponent } from '../../user/mainmenu/mainmenu.component';
import { BottomBarComponent } from "../../../shared/components/user/bottom-bar/bottom-bar.component";
import { RouterModule } from '@angular/router';
import { BottomBarAdminComponent } from "../../../shared/components/admin/bottom-bar-admin/bottom-bar-admin.component";
import { AuthAdminGuard } from 'src/app/common/guards/authAdminGuard';
import { AuthAdminService } from 'src/app/common/services/authAdminService';


@Component({
  selector: 'app-home-admin',
  standalone: true, 
  imports: [CommonModule, IonicModule, RouterModule, BottomBarAdminComponent], 
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})

export class HomeAdminComponent implements OnInit {

    constructor( private authAdminService: AuthAdminService) { }

    ngOnInit() {
        this.authAdminService.requireLogin(); // Verifica si el usuario está logueado
    }
}
````
#### invoice-admin.ts
````ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Comprobante } from 'src/app/common/interfaces/admin/comprobanteReserva';
import { ComprobanteAdminService } from 'src/app/common/services/comprobanteReserva-admin';
import { IonicModule } from '@ionic/angular';
import { BottomBarAdminComponent } from 'src/app/shared/components/admin/bottom-bar-admin/bottom-bar-admin.component';
import { AuthAdminService } from 'src/app/common/services/authAdminService';

@Component({
  selector: 'app-invoice-admin',
  templateUrl: './invoice-admin.page.html',
  styleUrls: ['./invoice-admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, BottomBarAdminComponent]
})
export class InvoiceAdminPage implements OnInit {

    comprobantes: Comprobante[] = [];
    loading = true;
    errorMsg = '';

    constructor(private compService: ComprobanteAdminService, private authService: AuthAdminService) {}

    ngOnInit() {
        this.authService.requireLogin(); // Verifica si el usuario está logueado
        this.compService.obtenerTodos().subscribe(resp => {
        if (resp.status && resp.data) {
            this.comprobantes = resp.data;
        } else {
            this.errorMsg = resp.message || 'Error al cargar facturas.';
        }
        this.loading = false;
        }, () => {
        this.errorMsg = 'Error al conectarse al servidor.';
        this.loading = false;
        });
    }

    verDetalle(id: number) {
        // Redirige a la vista del comprobante por ID de pago
        window.location.href = `/invoice-r-admin/${id}`;
    }
}
````
#### invoice-r-admin.ts
````ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent } from '@ionic/angular/standalone';
import { Comprobante } from 'src/app/common/interfaces/admin/comprobanteReserva';
import { ActivatedRoute } from '@angular/router';
import { ComprobanteAdminService } from 'src/app/common/services/comprobanteReserva-admin';
import { BottomBarAdminComponent } from "../../../shared/components/admin/bottom-bar-admin/bottom-bar-admin.component";
import { IonicModule } from '@ionic/angular';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AuthAdminService } from 'src/app/common/services/authAdminService';

@Component({
  selector: 'app-invoice-r-admin',
  templateUrl: './invoice-r-admin.page.html',
  styleUrls: ['./invoice-r-admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, BottomBarAdminComponent]
})
export class InvoiceRAdminPage implements OnInit {

    @ViewChild('invoiceContent', { static: false }) invoiceContent!: ElementRef;
    comprobante?: Comprobante;
    errorMsg?: string;
    loading = true;

    constructor(
        private route: ActivatedRoute,
        private compService: ComprobanteAdminService,
        private authService: AuthAdminService
    ) { }

    ngOnInit() {
        this.authService.requireLogin(); // Verifica si el usuario está logueado
        const pagoId = Number(this.route.snapshot.paramMap.get('pagoId'));
        this.compService.generarComprobante(pagoId).subscribe(genResp => {
        if (!genResp.status) {
            this.errorMsg = genResp.message;
            this.loading = false;
            return;
        }
        this.compService.obtenerPorPago(pagoId).subscribe(getResp => {
            if (getResp.status && getResp.data) {
            this.comprobante = getResp.data;
            } else {
            this.errorMsg = getResp.message;
            }
            this.loading = false;
        }, () => {
            this.errorMsg = 'Error al obtener comprobante';
            this.loading = false;
        });
        }, () => {
        this.errorMsg = 'Error al generar comprobante';
        this.loading = false;
        });
    }

    exportPDF() {
        if (!this.invoiceContent) return;

        const element = this.invoiceContent.nativeElement;

        html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff'
        }).then(originalCanvas => {
        // Crear lienzo blanco y negro
        const grayscaleCanvas = document.createElement('canvas');
        const ctx = grayscaleCanvas.getContext('2d');
        grayscaleCanvas.width = originalCanvas.width;
        grayscaleCanvas.height = originalCanvas.height;

        const imgData = originalCanvas.getContext('2d')?.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
        if (ctx && imgData) {
            const data = imgData.data;
            for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = data[i + 1] = data[i + 2] = avg;
            }
            ctx.putImageData(imgData, 0, 0);
        }

        const imgDataURL = grayscaleCanvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a5'); // A5 vertical

        const pageWidth = pdf.internal.pageSize.getWidth();
        const margin = 10;
        const usableWidth = pageWidth - 2 * margin;

        const imgProps = pdf.getImageProperties(imgDataURL);
        const imgHeight = (imgProps.height * usableWidth) / imgProps.width;

        pdf.addImage(imgDataURL, 'PNG', margin, 10, usableWidth, imgHeight);
        pdf.save(`comprobante_${this.comprobante?.id}.pdf`);
        });
    }
}
````
#### login-admin.ts
````ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { LoginService } from './login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, RouterLink],
})
export class LoginPage {
    userId: string = '';
    password: string = '';
    successMessage = '';
    errors: string[] = [];

    constructor(
        private loginService: LoginService,
        private navCtrl: NavController,
        private alertCtrl: AlertController
    ) {}

    login() {
        this.errors = [];
        this.successMessage = '';

        if (!this.userId) this.errors.push('El correo electrónico es obligatorio.');
        if (!this.password) this.errors.push('La contraseña es obligatoria.');

        if (this.errors.length > 0) return;

        const userData = {
        userId: this.userId,
        password: this.password
        };

        this.loginService.login(userData).subscribe({
        next: (response: boolean) => {
            if (response === true) {
            // Guardar el correo del administrador en localStorage
            sessionStorage.setItem('adminEmail', this.userId);

            this.successMessage = 'Inicio de sesión exitoso. Redirigiendo al panel de administración...';
            setTimeout(() => this.navCtrl.navigateRoot('/home-admin'), 1000);
            } else {
            this.errors.push('Credenciales inválidas para el administrador.');
            }
        },
        error: () => {
            this.errors.push('Error al conectar con el servidor. Intenta más tarde.');
        }
        });
    }

    forgotPassword() {
        this.alertCtrl.create({
        header: 'Recuperar contraseña',
        cssClass: 'custom-alert',
        inputs: [
            {
            name: 'email',
            type: 'email',
            placeholder: 'Ingresa tu correo'
            }
        ],
        buttons: [
            {
            text: 'Cancelar',
            role: 'cancel'
            },
            {
            text: 'Enviar',
            handler: data => {
                if (!data.email) {
                this.errors = ['El correo es obligatorio'];
                return;
                }

                this.loginService.recuperarContrasenia(data.email).subscribe({
                next: (response) => {
                    this.successMessage = response.message;
                    this.errors = [];
                },
                error: (err) => {
                    this.errors = [err.error.message || 'Error al recuperar contraseña'];
                    this.successMessage = '';
                }
                });
            }
            }
        ]
        }).then(alert => alert.present());
    }
}
````
#### products-admin.ts
````ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from 'src/app/common/interfaces/admin/producto';
import { ProductoService } from 'src/app/common/services/producto.service';
import { IonicModule } from '@ionic/angular';
import { ApiResponseDto } from 'src/app/common/interfaces/api-response-dto';
import { BottomBarComponent } from "../../../shared/components/user/bottom-bar/bottom-bar.component";
import { BottomBarAdminComponent } from "../../../shared/components/admin/bottom-bar-admin/bottom-bar-admin.component";
import { AuthAdminService } from 'src/app/common/services/authAdminService';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.page.html',
  styleUrls: ['./products-admin.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, BottomBarAdminComponent]
})
export class ProductsAdminPage implements OnInit {
    productos: Producto[] = [];
    nuevoProducto: Producto = {
        id: undefined,
        nombre: '',
        descripcion: '',
        estado: 'Activo',
        status: true,
        precio: 0,
        stock: 0,
        url: ''
    };
    productoEnEdicion: Producto | null = null;
    mostrarInactivos = false;

    constructor(private productoService: ProductoService, private authAdminService: AuthAdminService) {}

    ngOnInit() {
        this.authAdminService.requireLogin(); // Verifica si el usuario está logueado
        this.cargarProductos();
    }

    cargarProductos() {
        this.productoService.getAll().subscribe((res: ApiResponseDto<Producto[]>) => {
        if (res.data) {
            this.productos = res.data.filter(producto =>
            this.mostrarInactivos ? !producto.status : producto.status
            );
        } else {
            this.productos = [];
        }
        });
    }

    guardarProducto() {
        if (this.nuevoProducto.nombre && this.nuevoProducto.precio > 0 && this.nuevoProducto.stock >= 0) {
        this.nuevoProducto.status = true;

        this.productoService.save(this.nuevoProducto).subscribe(
            () => {
            this.resetFormulario();
            this.cargarProductos();
            },
            (error) => {
            console.error('Error al guardar producto', error);
            }
        );
        } else {
        console.error('Por favor complete todos los campos correctamente.');
        }
    }

    editarProducto(producto: Producto) {
        this.productoEnEdicion = { ...producto };
        this.nuevoProducto = { ...producto };
    }

    actualizarProducto() {
        if (this.productoEnEdicion && this.nuevoProducto.nombre && this.nuevoProducto.precio > 0) {
        this.productoService.update(this.productoEnEdicion.id!, this.nuevoProducto).subscribe(
            () => {
            this.productoEnEdicion = null;
            this.resetFormulario();
            this.cargarProductos();
            },
            (error) => {
            console.error('Error al actualizar producto', error);
            }
        );
        }
    }

    eliminarProducto(id: number | undefined) {
        if (id !== undefined) {
        const productoEliminar = this.productos.find(producto => producto.id === id);
        if (productoEliminar) {
            productoEliminar.status = false;
            this.productoService.update(id, productoEliminar).subscribe(
            () => this.cargarProductos(),
            (error) => console.error('Error al eliminar producto', error)
            );
        }
        }
    }

    reactivarProducto(producto: Producto) {
        producto.status = true;
        this.productoService.update(producto.id!, producto).subscribe(
        () => this.cargarProductos(),
        (error) => console.error('Error al reactivar producto', error)
        );
    }

    toggleInactivos() {
        this.mostrarInactivos = !this.mostrarInactivos;
        this.cargarProductos();
    }

    resetFormulario() {
        this.nuevoProducto = {
        id: undefined,
        nombre: '',
        descripcion: '',
        estado: 'Activo',
        status: true,
        precio: 0,
        stock: 0,
        url: ''
        };
    }
}
````

#### profile-admin.ts
````ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Admin } from 'src/app/common/interfaces/admin/admin';
import { AdminService } from 'src/app/common/services/admin.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BottomBarAdminComponent } from "../../../shared/components/admin/bottom-bar-admin/bottom-bar-admin.component";
import { AuthAdminService } from 'src/app/common/services/authAdminService';


@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.page.html',
  styleUrls: ['./profile-admin.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule, BottomBarAdminComponent]
})
export class ProfileAdminPage implements OnInit {

    admin: Admin | null = null;
        errors: string[] = [];
        modoEdicion: boolean = false;
        oldPassword: string = '';
        newPassword: string = '';
    
        constructor(
        private adminService: AdminService,
        private alertCtrl: AlertController,
        private router: Router,
        private authAdminService: AuthAdminService
    
        ) {}
    
        ngOnInit() {
        this.authAdminService.requireLogin(); // Verifica si el usuario está logueado
        const email = sessionStorage.getItem('adminEmail');
        if (email) {
            this.adminService.getByEmail(email).subscribe({
            next: (data) => this.admin = data,
            error: () => this.errors.push('No se pudo cargar el perfil del usuario.')
            });
        }
        }
    
        activarEdicion() {
        this.modoEdicion = true;
        }
    
        guardarCambios() {
        if (!this.admin) return;
    
        // Añadimos las contraseñas al usuario antes de enviarlo
        const updatedUser = {
            ...this.admin,
            oldPassword: this.oldPassword,
            newPassword: this.newPassword
        };
    
        this.adminService.updateUser(this.admin.email, updatedUser).subscribe({
            next: async () => {
            this.modoEdicion = false;
            const alert = await this.alertCtrl.create({
                header: 'Perfil actualizado',
                message: 'Tu información fue guardada exitosamente.',
                buttons: ['OK']
            });
            await alert.present();
            },
            error: async () => {
            const alert = await this.alertCtrl.create({
                header: 'Error',
                message: 'Hubo un problema al guardar los cambios.',
                buttons: ['OK']
            });
            await alert.present();
            }
        });
        }
        cerrarSesion() {
        sessionStorage.clear(); // Borra todos los datos de sesión
        this.router.navigate(['/login']); // Redirige al login
    }
}

````
#### usuarios-admin.ts
````ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/common/interfaces/user/usuario';
import { UsuarioService } from 'src/app/common/services/usuario.service';
import { BottomBarAdminComponent } from "../../../shared/components/admin/bottom-bar-admin/bottom-bar-admin.component";
import { AuthAdminService } from 'src/app/common/services/authAdminService';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.page.html',
  styleUrls: ['./usuarios-admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, BottomBarAdminComponent]
})
export class UsuariosAdminPage implements OnInit {

    usuarios: Usuario[] = [];
    usuarioActualizado: Usuario = {
        email: '',
        full_name: '',
        telefono: ''
    };

    constructor(private usuarioService: UsuarioService, private authAdminService: AuthAdminService) {}

    ngOnInit() {
        this.authAdminService.requireLogin(); // Verifica si el usuario está logueado
        this.cargarUsuarios();
    }

    cargarUsuarios() {
        this.usuarioService.getAll().subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        });
    }

    // Actualizar un usuario
    actualizarUsuario() {
        if (this.usuarioActualizado.email) {
        const data = {
            full_name: this.usuarioActualizado.full_name,
            telefono: this.usuarioActualizado.telefono
        };
        this.usuarioService.updateUser(this.usuarioActualizado.email, data).subscribe(
            (usuario) => {
            console.log('Usuario actualizado:', usuario);
            this.cargarUsuarios(); // Recargar la lista de usuarios
            },
            (error) => {
            console.error('Error al actualizar el usuario:', error);
            }
        );
        }
    }

    // Recuperar la contraseña
    recuperarContrasenia(email: string) {
        this.usuarioService.recuperarContrasenia(email).subscribe(
        (response) => {
            console.log('Recuperación de contraseña:', response);
        },
        (error) => {
            console.error('Error en la recuperación de contraseña:', error);
            });
        }
    }

````
----
El frontend de CaffeNet, desarrollado con Ionic y Angular, representa una solución robusta, escalable y bien estructurada para la gestión integral de una cafetería. Gracias a su arquitectura modular, separación de responsabilidades y reutilización de componentes, la aplicación permite un mantenimiento sencillo y una evolución continua del sistema. Además, el uso de servicios centralizados y tipado estricto mediante interfaces garantiza una comunicación eficiente y segura con el backend.