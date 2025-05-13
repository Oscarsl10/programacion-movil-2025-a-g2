import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
  imports : [IonicModule, CommonModule, FormsModule]
})
export class DateTimeComponent  {

  selectedDateTime: string = '';

  @Output() dateTimeSelected = new EventEmitter<string>();

  onDateTimeChange(event: any) {
    this.selectedDateTime = event.detail.value;
    this.dateTimeSelected.emit(this.selectedDateTime);
  }

}
