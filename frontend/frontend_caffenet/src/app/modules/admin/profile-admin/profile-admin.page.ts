import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Admin } from 'src/app/common/interfaces/admin/admin';
import { AdminService } from 'src/app/common/services/admin.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BottomBarAdminComponent } from "../../../shared/components/admin/bottom-bar-admin/bottom-bar-admin.component";
import { AuthAdminService } from 'src/app/common/services/authAdminService';


@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.page.html',
  styleUrls: ['./profile-admin.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule, BottomBarAdminComponent]
})
export class ProfileAdminPage {

   admin: Admin | null = null;
    errors: string[] = [];
    modoEdicion: boolean = false;
    oldPassword: string = '';
    newPassword: string = '';
  
    constructor(
      private adminService: AdminService,
      private alertCtrl: AlertController,
      private router: Router,
      private authAdminService: AuthAdminService
  
    ) {}
  
    ionViewWillEnter() {
      this.authAdminService.requireLogin(); // Verifica si el usuario está logueado
      const email = sessionStorage.getItem('adminEmail');
      if (email) {
        this.adminService.getByEmail(email).subscribe({
          next: (data) => this.admin = data,
          error: () => this.errors.push('No se pudo cargar el perfil del usuario.')
        });
      }
    }
  
    activarEdicion() {
      this.modoEdicion = true;
    }
  
    guardarCambios() {
      if (!this.admin) return;
  
      // Añadimos las contraseñas al usuario antes de enviarlo
      const updatedUser = {
        ...this.admin,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };
  
      this.adminService.updateUser(this.admin.email, updatedUser).subscribe({
        next: async () => {
          this.modoEdicion = false;
          const alert = await this.alertCtrl.create({
            header: 'Perfil actualizado',
            message: 'Tu información fue guardada exitosamente.',
            buttons: ['OK']
          });
          await alert.present();
        },
        error: async () => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Hubo un problema al guardar los cambios.',
            buttons: ['OK']
          });
          await alert.present();
        }
      });
    }
    cerrarSesion() {
    sessionStorage.clear(); // Borra todos los datos de sesión
    this.router.navigate(['/login']); // Redirige al login
  }

}
