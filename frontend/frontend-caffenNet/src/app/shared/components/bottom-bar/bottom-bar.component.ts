import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-bottom-bar',
  standalone: true, 
  imports: [CommonModule, IonicModule], 
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
    
})
export class BottomBarComponent{

  constructor() { }

}
