import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthAdminService } from 'src/app/common/services/authAdminService';
import { BottomBarAdminComponent } from 'src/app/shared/components/admin/bottom-bar-admin/bottom-bar-admin.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-facturation-admin',
  templateUrl: './facturation-admin.page.html',
  styleUrls: ['./facturation-admin.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, BottomBarAdminComponent], 
})
export class FacturationAdminPage implements OnInit {

  constructor(private authAdminService: AuthAdminService) { }

  ngOnInit() {
    this.authAdminService.requireLogin(); // Verifica si el usuario está logueado
  }
}
