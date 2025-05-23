import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailOrder } from 'src/app/common/interfaces/user/detail-order';
import { DetailOrderService } from 'src/app/common/services/detail-order.service';
import { IonicModule, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/common/interfaces/user/usuario';
import { UsuarioService } from 'src/app/common/services/usuario.service';
import { CarBuyService } from 'src/app/common/services/car-buy.service';
import { Router } from '@angular/router';
import { BottomBarComponent } from "../../../shared/components/user/bottom-bar/bottom-bar.component";
import { AuthUserService } from 'src/app/common/services/authUserService';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.page.html',
  styleUrls: ['./detail-order.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, BottomBarComponent]
})
export class DetailOrderPage {
  carrito: any[] = [];
  usuario!: Usuario;
  totalGeneral: number = 0;
  errors: string[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private detailOrderService: DetailOrderService,
    private carBuyService: CarBuyService,
    private router: Router,
    private toastController: ToastController,
    private authUserService: AuthUserService
  ) { }

  ionViewWillEnter(): void {
    this.authUserService.requireLogin(); // Verifica si el usuario está logueado
    const carritoGuardado = sessionStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
      this.totalGeneral = this.carrito.reduce((sum, item) => sum + item.total, 0);
    }

    const email = sessionStorage.getItem('email');
    if (email) {
      this.usuarioService.getByEmail(email).subscribe({
        next: (data) => this.usuario = data,
        error: () => this.errors.push('No se pudo cargar el perfil del usuario.')
      });
    }
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

  async confirmarPedido(): Promise<void> {
    if (!this.usuario || this.carrito.length === 0) {
      this.errors.push('No hay usuario o carrito vacío.');
      await this.mostrarToast('No hay usuario o carrito vacío.', 'danger');
      return;
    }

    const saves = this.carrito.map(item => {
      if (!item.id) {
        this.errors.push('Falta el ID del carBuy para uno de los productos.');
        return;
      }

      const now = new Date();
      const fechaCorregida = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

      const detalle: DetailOrder = {
        fecha_emision: fechaCorregida,
        carBuy: {
          id: item.id,
          fechaCreacion: item.fechaCreacion,
          estado: item.estado,
          cantidad: item.cantidad,
          producto: item.producto,
          total: item.total
        },
        producto: item.producto,
        users: this.usuario
      };

      return this.detailOrderService.save(detalle).toPromise();
    });

    try {
      await Promise.all(saves);
      await this.mostrarToast('Pedido confirmado con éxito');

      // Redirige tras pequeño retraso para permitir ver el toast
      setTimeout(() => {
        this.router.navigate(['/mainmenu']);
      }, 1000);

    } catch (error) {
      this.errors.push('Error al guardar los detalles del pedido.');
      console.error(error);
      await this.mostrarToast('Error al confirmar pedido.', 'danger');
    }
  }
}
