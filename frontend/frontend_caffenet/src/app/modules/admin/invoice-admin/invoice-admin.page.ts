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
export class InvoiceAdminPage {

  comprobantes: Comprobante[] = [];
  loading = true;
  errorMsg = '';

  constructor(private compService: ComprobanteAdminService, private authService: AuthAdminService) {}

  ionViewWillEnter() {
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
