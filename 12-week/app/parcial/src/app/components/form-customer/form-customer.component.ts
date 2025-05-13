import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.scss'],
  imports : [IonicModule, CommonModule, FormsModule]
})
export class FormCustomerComponent  {
  customer = { name: '', contact: '' };
  @Output() customerData = new EventEmitter<any>();

  emitCustomerData() {
    this.customerData.emit(this.customer);
  }

}
