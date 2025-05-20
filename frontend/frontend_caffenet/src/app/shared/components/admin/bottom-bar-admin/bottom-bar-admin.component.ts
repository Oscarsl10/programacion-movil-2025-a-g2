import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-bottom-bar-admin',
  templateUrl: './bottom-bar-admin.component.html',
  imports: [CommonModule, IonicModule, HttpClientModule, RouterLink], 
  styleUrls: ['./bottom-bar-admin.component.scss'],
})
export class BottomBarAdminComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
