import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-bottom-bar-guest',
  standalone: true, 
  imports: [CommonModule, IonicModule, HttpClientModule, RouterLink],
  templateUrl: './bottom-bar-guest.component.html',
  styleUrls: ['./bottom-bar-guest.component.scss'],
})
export class BottomBarGuestComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
