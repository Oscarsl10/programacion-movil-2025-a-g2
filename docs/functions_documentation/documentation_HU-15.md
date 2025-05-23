#  HU-15 - Modo invitado

##  Descripción

Como **visitante (no registrado)**, puedo acceder en modo restringido para visualizar los productos publicados, sin posibilidad de agregarlos al carrito ni realizar compras.

---

##  Criterios de Aceptación y Validación

### 1. Visualizar el catálogo completo de productos publicados

-  Se usa `productoService.getAll()` para obtener los productos.
-  Se filtran por `status === true` para mostrar solo productos activos.
-  Renderizado con `*ngFor="let cafe of cafesFiltrados"`.

```typescript
this.cafes = res.data.filter(
  (producto: Producto) => producto.status === true
);
```

---

### 2. Ver nombre, descripción, precio y stock de cada producto

-  Se muestra en el frontend:
  - `{{ cafe.nombre }}`
  - `{{ cafe.descripcion }}`
  - `{{ cafe.precio | currency:'COP' }}`
  - `Stock: {{ cafe.stock }}`
  mostrando asi en orden ejecutivo los atributos de los productos al usar el metodo ``getAll()`.

```html
<ion-card-title>{{ cafe.nombre }}</ion-card-title>
<p>{{ cafe.descripcion }}</p>
<span>{{ cafe.precio | currency:'COP' }}</span>
<span>Stock: {{ cafe.stock }}</span>

```

### 3. No mostrar opciones de carrito, pedido o pago

-  No se renderizan botones de carrito, compra ni pago.
-  El componente incluye una barra inferior restringida: `<app-bottom-bar-guest>`.
-  Los métodos relacionados con carrito están en el componente, pero no se usan ni se muestran.

---

##  Servicios utilizados

### `ProductoService`

- Método utilizado: `getAll()`
- Se espera que retorne todos los productos disponibles desde el backend.

## servicio desde el frontend:
```typescript
getAll(): Observable<any> {
  return this.http.get(`${this.apiUrl}/productos`);
}
```

---

##  Funcionalidades 

-  Búsqueda en tiempo real con `filtrarCafes()` para mejorar la experiencia de usuario invitado.

```typescript
filtrarCafes(event: any) {
  const texto = event.target.value.toLowerCase();
  this.cafesFiltrados = this.cafes.filter((producto: Producto) =>
    producto.nombre.toLowerCase().includes(texto)
  );
}
```

---

##  Conclusión
-  Catálogo completo visible
-  Detalles completos de cada producto
-  Sin opciones de compra ni carrito

El visitante puede explorar el catálogo de productos con una interfaz limpia, informativa y restringida según lo especificado.