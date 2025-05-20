import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailOrder } from 'src/app/common/interfaces/user/detail-order';
import { DetailOrderService } from 'src/app/common/services/detail-order.service';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/common/interfaces/user/usuario';
import { UsuarioService } from 'src/app/common/services/usuario.service';
import { CarBuyService } from 'src/app/common/services/car-buy.service';
import { Router } from '@angular/router';
import { BottomBarComponent } from "../../../shared/components/user/bottom-bar/bottom-bar.component";
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.page.html',
  styleUrls: ['./detail-order.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, BottomBarComponent]
})
export class DetailOrderPage implements OnInit {
  carrito: any[] = [];
  usuario!: Usuario;
  totalGeneral: number = 0;
  errors: string[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private detailOrderService: DetailOrderService,
    private carBuyService: CarBuyService,
    private router: Router,
    private alertController: AlertController   // <- Inyectamos el AlertController

  ) { }

  ngOnInit(): void {
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

  
  async confirmarPedido(): Promise<void> {
    if (!this.usuario || this.carrito.length === 0) {
      this.errors.push('No hay usuario o carrito vacío.');
      return;
    }

    // Vamos a guardar todos los observables para esperar a que terminen todos
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

      const alert = await this.alertController.create({
        header: 'Pedido confirmado',
        message: 'Tu pedido se ha realizado con éxito.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/mainmenu']);
            }
          }
        ]
      });

      await alert.present();

    } catch (error) {
      this.errors.push('Error al guardar los detalles del pedido.');
      console.error(error);
    }
  }
}