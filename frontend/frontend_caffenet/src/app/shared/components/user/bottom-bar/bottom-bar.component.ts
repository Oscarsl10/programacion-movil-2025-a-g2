import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-bottom-bar',
  standalone: true, 
  imports: [CommonModule, IonicModule, HttpClientModule, RouterLink], 
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
    
})
export class BottomBarComponent{

  constructor() { }

}
