import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PayR } from 'src/app/common/interfaces/admin/pay-r';
import { PayRAdminService } from 'src/app/common/services/pay-r-admin';
import { IonicModule } from '@ionic/angular';
import { BottomBarAdminComponent } from "../../../shared/components/admin/bottom-bar-admin/bottom-bar-admin.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthAdminService } from 'src/app/common/services/authAdminService';
import { ReservaService } from 'src/app/common/services/reserva.service';
import { Reserva } from 'src/app/common/interfaces/admin/reserva';
import { Router, RouterLink } from '@angular/router';
import { ComprobanteAdminService } from 'src/app/common/services/comprobanteReserva-admin';


@Component({
  selector: 'app-pay-r-admin',
  templateUrl: './pay-r-admin.page.html',
  styleUrls: ['./pay-r-admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, BottomBarAdminComponent, RouterLink]
})
export class PayRAdminPage implements OnInit {

  reservaCodigo: string = '';
  reserva?: Reserva;
  metodoPago: string = '';
  pagos: PayR[] = [];

  constructor(
    private reservaService: ReservaService,
    private pagoService: PayRAdminService,
    private authAdminService: AuthAdminService
  ) { }

  ngOnInit(): void {
    this.authAdminService.requireLogin();
  }

  buscarReserva(): void {
    const codigo = this.reservaCodigo.trim();
    if (!codigo) {
      this.reserva = undefined;
      return;
    }
    this.reservaService.getReservaByCodigo(codigo).subscribe({
      next: res => this.reserva = res,
      error: _ => {
        console.error('Error al cargar reserva');
        this.reserva = undefined;
      }
    });
  }

  pagar(): void {
    if (!this.reserva || !this.metodoPago.trim()) return;

    const nuevoPago: PayR = {
      metodo_pago: this.metodoPago,
      reserva: { id: this.reserva.id! } as any,
      users: { email: this.reserva.users.email } as any
    };

    this.pagoService.addPago(nuevoPago).subscribe({
      next: pago => {
        this.pagos.push(pago);
        this.metodoPago = '';
      },
      error: err => console.error('Error creando pago:', err)
    })
  }
}