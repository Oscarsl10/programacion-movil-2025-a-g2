import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from 'src/app/shared/components/product-card/product-card.component';
import { BottomBarComponent } from 'src/app/shared/components/user/bottom-bar/bottom-bar.component';
import { ProductoService } from 'src/app/common/services/producto.service';
import { HttpClientModule } from '@angular/common/http';
import { Producto } from 'src/app/common/interfaces/admin/producto';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { carBuy } from 'src/app/common/interfaces/user/carBuy';
import { CarBuyService } from 'src/app/common/services/car-buy.service';
import { AuthUserService } from 'src/app/common/services/authUserService';
import { Usuario } from 'src/app/common/interfaces/user/usuario';


@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, BottomBarComponent, HttpClientModule, IonicModule, RouterLink]
})
export class MainmenuComponent {
  cafes: Producto[] = [];
  cafesFiltrados: Producto[] = [];


  constructor(
    private productoService: ProductoService,
    private carBuyService: CarBuyService,
    private authUserService: AuthUserService
  ) { }

  ngOnInit() {
    this.authUserService.requireLogin(); // Verifica si el usuario está logueado
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getAll().subscribe((res) => {
      if (res && res.data) {
        this.cafes = res.data.filter(
          (producto: Producto) => producto.status === true
        );
        this.cafesFiltrados = [...this.cafes]; // Inicializamos los filtrados
      }
    });
  }

  filtrarCafes(event: any) {
    const texto = event.target.value.toLowerCase();
    this.cafesFiltrados = this.cafes.filter((producto) =>
      producto.nombre.toLowerCase().includes(texto)
    );
  }

  agregarAlCarrito(producto: Producto) {
    if (!producto.id) {
      console.error('Producto sin id, no se puede agregar al carrito');
      return;
    }

    this.carBuyService.getAll().subscribe({
      next: (res) => {
        const carrito: carBuy[] = res.data || [];
        // SOLO busca productos con estado ACTIVO
        const itemExistente = carrito.find(
          item => item.producto?.id === producto.id && item.estado === 'ACTIVO'
        );

        const cantidadAAgregar = 1;

        if (itemExistente) {
          const cantidadActual = itemExistente.cantidad ?? 0;
          const nuevaCantidad = cantidadActual + cantidadAAgregar;

          // Validar stock
          if (producto.stock !== undefined && nuevaCantidad > producto.stock) {
            alert(`No puedes agregar más de ${producto.stock} unidades de este producto.`);
            return;
          }

          const nuevoTotal = producto.precio * nuevaCantidad;

          const itemActualizado: carBuy = {
            ...itemExistente,
            cantidad: nuevaCantidad,
            total: nuevoTotal
          };

          this.carBuyService.update(itemExistente.id!, itemActualizado).subscribe({
            next: () => console.log('Cantidad actualizada en el carrito'),
            error: err => console.error('Error actualizando cantidad', err)
          });

        } else {
          // Validar stock antes de crear nuevo ítem
          if (producto.stock !== undefined && cantidadAAgregar > producto.stock) {
            alert(`No puedes agregar más de ${producto.stock} unidades de este producto.`);
            return;
          }

          const nuevoItem: carBuy = {
            fechaCreacion: new Date().toISOString(),
            estado: 'ACTIVO',
            cantidad: cantidadAAgregar,
            producto: {
              id: producto.id!,
              nombre: producto.nombre,
              descripcion: producto.descripcion,
              precio: producto.precio,
              stock: producto.stock,
            },
            total: producto.precio * cantidadAAgregar,
          };

          // Asegúrate de NO enviar id
          delete (nuevoItem as any).id;

          this.carBuyService.save(nuevoItem).subscribe({
            next: () => console.log('Producto añadido al carrito'),
            error: err => console.error('Error agregando producto', err)
          });
        }
      },
      error: err => console.error('Error consultando carrito', err)
    });
  }


}
