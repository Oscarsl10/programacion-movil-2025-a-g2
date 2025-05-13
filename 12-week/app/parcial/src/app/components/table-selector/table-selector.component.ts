import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-selector',
  templateUrl: './table-selector.component.html',
  styleUrls: ['./table-selector.component.scss'],
  imports : [IonicModule, CommonModule, FormsModule]
})
export class TableSelectorComponent  {
  @Input() availableTables: number[] = [];
  @Output() tableSelected = new EventEmitter<number>();

  selectTable(table: number) {
    this.tableSelected.emit(table);
  }

}
