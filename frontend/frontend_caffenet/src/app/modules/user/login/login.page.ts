import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { NavController, IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './login.service';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/common/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, RouterLink],
})
export class LoginPage {
  alertButtons = ['Action'];
 userId: string = '';
  password: string = '';
  successMessage = '';
  errors: string[] = [];

  constructor(
    private loginService: LoginService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  login() {
    this.errors = [];
    this.successMessage = '';

    // Validación de campos
    if (!this.userId) this.errors.push('El correo electrónico es obligatorio.');
    if (!this.password) this.errors.push('La contraseña es obligatoria.');

    if (this.errors.length > 0) return;

    const userData = {
      userId: this.userId,
      password: this.password
    };

    this.loginService.login(userData).subscribe({
      next: (response: boolean) => {
        if (response) {
          // Guardar el correo en localStorage y redirigir
          sessionStorage.setItem('email', this.userId);
          this.successMessage = 'Inicio de sesión exitoso. Redirigiendo al menú...';
          setTimeout(() => this.navCtrl.navigateRoot('/mainmenu'), 1000);
        } else {
          this.errors.push('Credenciales incorrectas. Intenta de nuevo.');
        }
      },
      error: () => {
        this.errors.push('Error de conexión. Intenta más tarde.');
      }
    });
  }


  forgotPassword() {
    this.alertCtrl.create({
      header: 'Recuperar contraseña',
      cssClass: 'custom-alert',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Ingresa tu correo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Enviar',
          handler: data => {
            if (!data.email) {
              this.errors = ['El correo es obligatorio'];
              return;
            }

            this.loginService.recuperarContrasenia(data.email).subscribe({
              next: (response) => {
                this.successMessage = response.message;
                this.errors = [];  // Limpiar errores si hay éxito
              },
              error: (err) => {
                this.errors = [err.error.message || 'Error al recuperar contraseña'];
                this.successMessage = '';  // Limpiar mensaje de éxito si hay error
              }
            });
          }
        }
      ]
    }).then(alert => alert.present());
  }
}
