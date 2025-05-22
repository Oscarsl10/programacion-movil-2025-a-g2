import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { PayOrderService } from 'src/app/common/services/pay-order.service';
import { PayOrder } from 'src/app/common/interfaces/admin/pay-order';
import { ApiResponseDto } from 'src/app/common/interfaces/api-response-dto';
import { BottomBarAdminComponent } from 'src/app/shared/components/admin/bottom-bar-admin/bottom-bar-admin.component';
@Component({
  selector: 'app-payment-admin',
  templateUrl: './payment-admin.page.html',
  styleUrls: ['./payment-admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,BottomBarAdminComponent]
})
export class PaymentAdminPage {
  pagos: PayOrder[] = [];
  constructor(private payOrderService: PayOrderService) {}

  ionViewWillEnter() {
    this.loadPagos();
  }

loadPagos() {
  this.payOrderService.getAll().subscribe({
  next: (response: ApiResponseDto<PayOrder[]>) => {
    this.pagos = response.data;  // Aquí asignas solo el array de pagos
  },
  error: (err) => {
    console.error('Error al cargar los pagos:', err);
  }
});

}

}
