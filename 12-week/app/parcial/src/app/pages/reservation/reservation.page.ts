import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { TableSelectorComponent } from 'src/app/components/table-selector/table-selector.component';
import { FormCustomerComponent } from 'src/app/components/form-customer/form-customer.component';
import { DateTimeComponent } from 'src/app/components/date-time/date-time.component';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TableSelectorComponent, FormCustomerComponent, DateTimeComponent],
})
export class ReservationPage {

  reservationData: any = {};
  mesasDisponibles = [1, 2, 3, 4, 5];

  updateDateTime(dateTime: string) {
    this.reservationData.dateTime = dateTime;
  }

  updateCustomer(customer: any) {
    this.reservationData.customer = customer;
  }

  updateTable(table: number) {
    this.reservationData.table = table;
  }

  guardarReserva() {
    console.log('Datos de la reserva:', this.reservationData);
  }

}
