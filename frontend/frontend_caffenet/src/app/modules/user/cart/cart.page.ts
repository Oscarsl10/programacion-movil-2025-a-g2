import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarBuyService } from 'src/app/common/services/car-buy.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Producto } from 'src/app/common/interfaces/admin/producto';
import { carBuy } from 'src/app/common/interfaces/user/carBuy';
import { BottomBarComponent } from 'src/app/shared/components/user/bottom-bar/bottom-bar.component';
import { AuthUserService } from 'src/app/common/services/authUserService';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from 'src/app/common/services/usuario.service';
import { Usuario } from 'src/app/common/interfaces/user/usuario';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule, BottomBarComponent]
})
export class CartPage implements OnInit {
  carrito: carBuy[] = [];
  total: number = 0;
  errors: string[] = [];

  constructor(
    private carBuyService: CarBuyService,
    private authUserService: AuthUserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authUserService.requireLogin();
    this.cargarCarrito();
  }

  cargarCarrito() {
  this.carBuyService.getAll().subscribe({
    next: res => {
      if (res && res.data) {
        // Filtra los carritos que NO estén comprados
        this.carrito = res.data
          .filter(item => item.estado !== 'COMPRADO')
          .filter(item => item.estado !== 'RETIRADO')
          .map(item => ({
            ...item,
            cantidad: item.cantidad ?? 1,
            total: item.producto.precio * (item.cantidad ?? 1)
          }));
        this.total = this.carrito.reduce((sum, item) => sum + item.total, 0);
      }
    },
    error: err => {
      console.error('Error al cargar carrito', err);
      this.errors.push('Error al cargar carrito');
    }
  });
}

  eliminarDelCarrito(id: number | undefined) {
    if (id === undefined) {
      console.error('ID inválido para eliminar:', id);
      return;
    }
    this.carBuyService.deleteById(id).subscribe({
      next: (res) => {
        console.log('Delete response:', res);
        this.carrito = this.carrito.filter(item => item.id !== id);
        this.calcularTotal();

      },
      error: err => console.error('Error al eliminar producto del carrito', err)
    });
  }



  cambiarCantidad(item: carBuy, cambio: number) {
    this.errors = [];

    const nuevaCantidad = (item.cantidad ?? 1) + cambio;
    if (nuevaCantidad < 1) return;

    const stockDisponible = item.producto.stock ?? 10;
    if (nuevaCantidad > stockDisponible) {
      const mensaje = `No puedes tener más de ${stockDisponible} unidades de este producto.`;
      this.errors.push(mensaje);
      setTimeout(() => {
        this.errors = this.errors.filter(e => e !== mensaje);
      }, 2000);
      return;
    }

    item.cantidad = nuevaCantidad;
    item.total = item.producto.precio * item.cantidad;
    console.log('Objeto a actualizar:', item);

    if (item.id !== undefined) {
      this.carBuyService.update(item.id, item).subscribe({
        next: (res) => {
          console.log('Update response:', res);
          this.calcularTotal();
          this.carrito = [...this.carrito]; // para que Angular detecte cambio y actualice la vista
        },
        error: err => console.error('Error actualizando cantidad', err)
      });


    }
  }

  vaciarCarrito() {
    this.carBuyService.clearCart().subscribe({
      next: () => {
        this.carrito = [];
        this.total = 0;
      },
      error: err => {
        console.error('Error al vaciar carrito', err);
        this.errors.push('Error al vaciar carrito');
      }
    });
  }

  calcularTotal(): void {
    this.total = this.carrito.reduce((sum, item) => sum + item.total, 0);
  }


  generarPedido(): void {
    // Ya no se necesita usuario, solo carrito
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.router.navigate(['/detail-order']);
  }
}
