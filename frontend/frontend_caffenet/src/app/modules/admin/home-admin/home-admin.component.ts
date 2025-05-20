import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MainmenuComponent } from '../../user/mainmenu/mainmenu.component';
import { BottomBarComponent } from "../../../shared/components/user/bottom-bar/bottom-bar.component";
import { RouterModule } from '@angular/router';
import { BottomBarAdminComponent } from "../../../shared/components/admin/bottom-bar-admin/bottom-bar-admin.component";
import { AuthAdminGuard } from 'src/app/common/guards/authAdminGuard';
import { AuthAdminService } from 'src/app/common/services/authAdminService';


@Component({
  selector: 'app-home-admin',
  standalone: true, 
  imports: [CommonModule, IonicModule, RouterModule, BottomBarAdminComponent], 
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})

export class HomeAdminComponent implements OnInit {

  constructor( private authAdminService: AuthAdminService) { }

  ngOnInit() {
    this.authAdminService.requireLogin(); // Verifica si el usuario está logueado
  }

}
