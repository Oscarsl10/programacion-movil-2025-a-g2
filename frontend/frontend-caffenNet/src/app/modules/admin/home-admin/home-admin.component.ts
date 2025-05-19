import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MainmenuComponent } from '../../user/mainmenu/mainmenu.component';
import { BottomBarComponent } from "../../../shared/components/bottom-bar/bottom-bar.component";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home-admin',
  standalone: true, 
  imports: [CommonModule, IonicModule, BottomBarComponent, RouterModule], 
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})

export class HomeAdminComponent {

  constructor() { }

  ngOnInit() {}

}
