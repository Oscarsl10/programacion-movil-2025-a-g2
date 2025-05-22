import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarBuyService } from 'src/app/common/services/car-buy.service';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Producto } from 'src/app/common/interfaces/admin/producto';
import { carBuy } from 'src/app/common/interfaces/user/carBuy';
import { BottomBarComponent } from 'src/app/shared/components/user/bottom-bar/bottom-bar.component';
import { AuthUserService } from 'src/app/common/services/authUserService';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/common/interfaces/user/usuario';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule, BottomBarComponent]
})
export class CartPage {
  carrito: carBuy[] = [];
  total: number = 0;

  constructor(
    private carBuyService: CarBuyService,
    private authUserService: AuthUserService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ionViewWillEnter() {
    this.authUserService.requireLogin();
    this.cargarCarrito();
  }

  async mostrarToast(mensaje: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color,
      cssClass: 'custom-toast',
      position: 'top'
    });
    await toast.present();
  }

  cargarCarrito() {
    const email = sessionStorage.getItem('email') || '';
    const full_name = sessionStorage.getItem('full_name') || '';
    const telefono = sessionStorage.getItem('telefono') || '';

    this.carBuyService.getAll().subscribe({
      next: res => {
        if (res && res.data) {
          this.carrito = res.data
            .filter(item =>
              item.estado !== 'COMPRADO' &&
              item.estado !== 'RETIRADO' &&
              item.user &&
              item.user.email === email
            )
            .map(item => ({
              ...item,
              cantidad: item.cantidad ?? 1,
              total: item.producto.precio * (item.cantidad ?? 1),
              // Para mostrar datos en el frontend puedes dejar todos los campos,
              // pero para enviar al backend SOLO el email
              user: { email, full_name, telefono } as Usuario
            }));
          this.calcularTotal();
        }
      },
      error: err => {
        console.error('Error al cargar carrito', err);
        this.mostrarToast('Error al cargar carrito');
      }
    });
  }

  eliminarDelCarrito(id: number | undefined) {
    if (id === undefined) {
      console.error('ID inválido para eliminar:', id);
      return;
    }
    this.carBuyService.deleteById(id).subscribe({
      next: () => {
        this.carrito = this.carrito.filter(item => item.id !== id);
        this.calcularTotal();
        this.mostrarToast('Producto eliminado del carrito', 'success');
      },
      error: err => {
        console.error('Error al eliminar producto del carrito', err);
        this.mostrarToast('Error al eliminar producto del carrito');
      }
    });
  }

  cambiarCantidad(item: carBuy, cambio: number) {
    const nuevaCantidad = (item.cantidad ?? 1) + cambio;
    if (nuevaCantidad < 1) return;

    const stockDisponible = item.producto.stock ?? 10;
    if (nuevaCantidad > stockDisponible) {
      const mensaje = `No puedes tener más de ${stockDisponible} unidades de este producto.`;
      this.mostrarToast(mensaje, 'warning');
      return;
    }

    item.cantidad = nuevaCantidad;
    item.total = item.producto.precio * item.cantidad;

    if (item.id !== undefined) {
      const body = {
        ...item,
        user: {
          email: item.user?.email || '',
          full_name: item.user?.full_name ?? ''
        }
      };
      this.carBuyService.update(item.id, body).subscribe({
        next: () => {
          this.calcularTotal();
          this.carrito = [...this.carrito];
        },
        error: err => {
          console.error('Error actualizando cantidad', err);
          this.mostrarToast('Error actualizando cantidad');
        }
      });
    }
  }

  vaciarCarrito() {
    this.carBuyService.clearCart().subscribe({
      next: () => {
        this.carrito = [];
        this.total = 0;
        this.mostrarToast('Carrito vaciado correctamente', 'success');
      },
      error: err => {
        console.error('Error al vaciar carrito', err);
        this.mostrarToast('Error al vaciar carrito');
      }
    });
  }

  calcularTotal(): void {
    this.total = this.carrito.reduce((sum, item) => sum + item.total, 0);
  }

  generarPedido(): void {
    const carritoParaGuardar = this.carrito.map(item => ({
      ...item,
      user: {
        email: item.user?.email || '',
        full_name: item.user?.full_name ?? ''
      }
    }));
    sessionStorage.setItem('carrito', JSON.stringify(carritoParaGuardar));

    this.carBuyService.clearCart().subscribe({
      next: () => {
        this.carrito = [];
        this.total = 0;
        this.mostrarToast('Pedido generado y carrito vaciado', 'success');
        this.router.navigate(['/detail-order']);
      },
      error: err => {
        console.error('Error al vaciar carrito al generar pedido', err);
        this.mostrarToast('Error al generar pedido');
      }
    });
  }
}