import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from 'src/app/shared/components/product-card/product-card.component';
import { BottomBarComponent } from 'src/app/shared/components/user/bottom-bar/bottom-bar.component';
import { ProductoService } from 'src/app/common/services/producto.service';
import { HttpClientModule } from '@angular/common/http';
import { Producto } from 'src/app/common/interfaces/admin/producto';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { carBuy } from 'src/app/common/interfaces/user/carBuy';
import { CarBuyService } from 'src/app/common/services/car-buy.service';
import { AuthUserService } from 'src/app/common/services/authUserService';

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
    private authUserService: AuthUserService,
    private toastController: ToastController
  ) { }

  ionViewWillEnter() {
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

  async mostrarToast(mensaje: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }

  agregarAlCarrito(producto: Producto) {
    if (!producto.id) {
      console.error('Producto sin id, no se puede agregar al carrito');
      return;
    }

    const email = sessionStorage.getItem('email') || '';
    const full_name = sessionStorage.getItem('full_name') || '';

    this.carBuyService.getAll().subscribe({
      next: (res) => {
        const carrito: carBuy[] = res.data || [];
        const itemExistente = carrito.find(
          item => item.producto?.id === producto.id && item.estado === 'ACTIVO'
        );

        const cantidadAAgregar = 1;

        if (itemExistente) {
          const cantidadActual = itemExistente.cantidad ?? 0;
          const nuevaCantidad = cantidadActual + cantidadAAgregar;

          if (producto.stock !== undefined && nuevaCantidad > producto.stock) {
            this.mostrarToast(`No puedes agregar más de ${producto.stock} unidades de este producto.`, 'danger');
            return;
          }

          const nuevoTotal = producto.precio * nuevaCantidad;

          const itemActualizado: carBuy = {
            ...itemExistente,
            cantidad: nuevaCantidad,
            total: nuevoTotal,
            user: {
              email: itemExistente.user?.email || email,
              full_name: itemExistente.user?.full_name || full_name
            }
          };

          this.carBuyService.update(itemExistente.id!, itemActualizado).subscribe({
            next: () => {
              this.mostrarToast('Cantidad actualizada en el carrito');
            },
            error: err => {
              console.error('Error actualizando cantidad', err);
              this.mostrarToast('Error actualizando cantidad', 'danger');
            }
          });

        } else {
          if (producto.stock !== undefined && cantidadAAgregar > producto.stock) {
            this.mostrarToast(`No puedes agregar más de ${producto.stock} unidades de este producto.`, 'danger');
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
            user: {
              email,
              full_name
            }
          };

          delete (nuevoItem as any).id;

          this.carBuyService.save(nuevoItem).subscribe({
            next: () => {
              this.mostrarToast('Producto añadido al carrito');
            },
            error: err => {
              console.error('Error agregando producto', err);
              this.mostrarToast('Error agregando producto', 'danger');
            }
          });
        }
      },
      error: err => {
        console.error('Error consultando carrito', err);
        this.mostrarToast('Error consultando carrito', 'danger');
      }
    });
  }
}
