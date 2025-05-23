import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/common/services/usuario.service';
import { Usuario } from 'src/app/common/interfaces/user/usuario';
import { Router } from '@angular/router';
import { BottomBarComponent } from "../../../shared/components/user/bottom-bar/bottom-bar.component";
import { AuthUserService } from 'src/app/common/services/authUserService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule, BottomBarComponent]
})
export class ProfilePage {
  
  usuario: Usuario | null = null;
  errors: string[] = [];
  modoEdicion: boolean = false;
  oldPassword: string = '';
  newPassword: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private alertCtrl: AlertController,
    private router: Router,
    private authUserService: AuthUserService

  ) {}

  ionViewWillEnter() {
    this.authUserService.requireLogin(); // Verifica si el usuario está logueado
    const email = sessionStorage.getItem('email');
    if (email) {
      this.usuarioService.getByEmail(email).subscribe({
        next: (data) => this.usuario = data,
        error: () => this.errors.push('No se pudo cargar el perfil del usuario.')
      });
    }
  }

  activarEdicion() {
    this.modoEdicion = true;
  }

  guardarCambios() {
    if (!this.usuario) return;

    // Añadimos las contraseñas al usuario antes de enviarlo
    const updatedUser = {
      ...this.usuario,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    };

    this.usuarioService.updateUser(this.usuario.email, updatedUser).subscribe({
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