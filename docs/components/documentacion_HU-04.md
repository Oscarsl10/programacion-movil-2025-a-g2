
# ☕ App de Gestión de Cafetería - Ionic + Angular

Una aplicación móvil construida con **Ionic** y **Angular** para la gestión de una cafetería, donde los usuarios pueden visualizar productos (cafés), buscar, agregar al carrito y navegar fácilmente entre secciones.


---

## 🚀 Tecnologías Utilizadas

- **Ionic Framework** (Angular)
- **TypeScript**
- **SCSS** para estilos personalizados
- **Componentes personalizados** de Ionic
- **Routing** dinámico con `loadComponent`

---

## 🧩 Componentes Personalizados

### `BottomBarComponent`
Barra de navegación inferior con íconos para navegación rápida.

```html
<ion-footer>
  <ion-toolbar>
    <ion-grid>
      <ion-row class="ion-justify-content-around">
        <ion-col size="3" class="ion-text-center">
          <ion-button fill="clear" routerLink="/home">
            <ion-icon name="home-outline"></ion-icon>
          </ion-button>
        </ion-col>
        <ion-col size="3" class="ion-text-center">
          <ion-button fill="clear" routerLink="/cart">
            <ion-icon name="cart-outline"></ion-icon>
          </ion-button>
        </ion-col>
        <ion-col size="3" class="ion-text-center">
          <ion-button fill="clear" routerLink="/notifications">
            <ion-icon name="notifications-outline"></ion-icon>
          </ion-button>
        </ion-col>
        <ion-col size="3" class="ion-text-center">
          <ion-button fill="clear" routerLink="/profile">
            <ion-icon name="person-circle-outline"></ion-icon>
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-toolbar>
</ion-footer>
```

### `ProductCardComponent`
Tarjeta personalizada para cada café.

```html
<ion-card>
  <img [src]="producto.imagen" alt="{{ producto.nombre }}" />
  <ion-card-header>
    <ion-card-title>{{ producto.nombre }}</ion-card-title>
  </ion-card-header>
  <div class="price-container">
    <ion-card-subtitle>{{ producto.precio | currency:'COP' }}</ion-card-subtitle>
    <ion-button fill="solid" color="warning" shape="round" size="small" (click)="agregarAlCarrito()">+</ion-button>
  </div>
</ion-card>
```

---

## 🧠 Página Principal: `MainmenuComponent`

```html
<ion-header>
  <ion-toolbar>
    <ion-title>Menú Principal</ion-title>
    <ion-buttons slot="end">
      <ion-button>
        <ion-icon name="person-circle-outline" style="font-size: 40px;"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-searchbar placeholder="Busca tu café favorito..."></ion-searchbar>
  <ion-grid>
    <ion-row>
      <ion-col size="6" *ngFor="let cafe of cafes">
        <app-product-card 
          [producto]="cafe" 
          (addToCart)="agregarAlCarrito($event)">
        </app-product-card>
      </ion-col>
    </ion-row>
  </ion-grid>
</ion-content>

<app-bottom-bar></app-bottom-bar>
```

---


## 🎨 Paleta de Colores

| Elemento              | Color         |
|-----------------------|---------------|
| Fondo principal       | `#1e172d`     |
| Tarjetas              | `#2d223c`     |
| Texto e íconos        | `#f4e1c1`     |
| Precio destacado      | `#e0b354`     |
| Fondo barra inferior  | `#2d223c`     |

---

## ✅ Funcionalidades

- [x] Búsqueda de cafés
- [x] Visualización de lista de productos
- [x] Agregar productos al carrito
- [x] Navegación por barra inferior

---

### ✅ Identificación y Documentación de Componentes Principales  
Para garantizar una arquitectura bien definida y organizada, se han identificado y documentado los principales componentes del sistema. Esto facilita la comprensión del proyecto y su mantenimiento. Los principales elementos identificados son:  

- **Componentes UI:** Elementos reutilizables que mejoran la modularidad, como:  
  - `BottomBarComponent`: Barra de navegación inferior con accesos rápidos.  
  - `ProductCardComponent`: Muestra información del producto y permite agregarlo al carrito.  
  - `MainmenuComponent`: Contenedor principal que gestiona la interfaz del usuario.  

- **Páginas principales:**  
  - `HomePage`: Página inicial de la aplicación, punto de entrada.  
  - `ProductsPage`: Vista donde se listan todos los productos disponibles.  

- **Módulos y Librerías Importadas:**  
  - `CommonModule`: Proporciona directivas y funcionalidades comunes en Angular.  
  - `IonicModule`: Ofrece componentes visuales optimizados para aplicaciones móviles.  
  - `FormsModule`: Permite manejar formularios dentro de los componentes.  
  - `IonComponents`: Conjunto de componentes personalizados para la interfaz.  
---

### 🔄 Definición de Relaciones y Dependencias  
Un sistema bien estructurado debe definir claramente las relaciones y dependencias entre sus componentes. Esto garantiza la cohesión y la escalabilidad del proyecto.  

- **Componentes reutilizables:**  
  - `ProductCardComponent` y `BottomBarComponent` son importados en `MainmenuComponent` para mantener una interfaz modular.  

- **Comunicación entre componentes:**  
  - `ProductCardComponent` emite eventos (`addToCart`), permitiendo que `MainmenuComponent` gestione la acción de agregar productos al carrito.  

- **Sistema de navegación:**  
  - `BottomBarComponent` usa `routerLink` para facilitar la navegación entre secciones, asegurando una experiencia fluida para el usuario.  

Este diseño modular y bien estructurado permite agregar nuevas funciones sin afectar otras partes del sistema.  

---

### 🎯 Establecimiento de Responsabilidades  
Cada componente dentro de la arquitectura tiene una responsabilidad clara, lo que mejora la mantenibilidad y reduce la complejidad del código.  

- **`BottomBarComponent`**  
  - Función: Proporciona navegación entre diferentes secciones de la aplicación.  
  - Relación: Se reutiliza en varias páginas para mantener una navegación coherente.  

- **`ProductCardComponent`**  
  - Función: Muestra información de un producto individual y permite agregarlo al carrito.  
  - Relación: Se comunica con `MainmenuComponent` mediante eventos para gestionar la compra.  

- **`MainmenuComponent`**  
  - Función: Página principal que lista productos y gestiona la interacción con el usuario.  
  - Relación: Coordina la comunicación entre `ProductCardComponent` y el carrito de compras.  

- **`HomePage`**  
  - Función: Punto de entrada de la aplicación, encargada de cargar los componentes principales.  
  
Este enfoque permite que cada parte del sistema cumpla un rol específico, evitando dependencias innecesarias y facilitando futuras mejoras. 🚀
