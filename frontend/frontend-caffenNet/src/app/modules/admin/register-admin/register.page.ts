import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from './register.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, RouterLink]
})
export class RegisterPage {
  name = '';
  email = '';
  phone = '';
  password = '';
  successMessage = '';
  errors: string[] = [];

  constructor(
    private registerService: RegisterService,
    private navCtrl: NavController
  ) {}

  register() {
    this.errors = [];
    this.successMessage = '';

    if (!this.name) this.errors.push('El nombre es obligatorio.');
    if (!this.email) this.errors.push('El correo electrónico es obligatorio.');
    if (!this.phone) this.errors.push('El teléfono es obligatorio.');
    if (!this.password) this.errors.push('La contraseña es obligatoria.');

    if (this.errors.length > 0) return;

    const userData = {
      full_name: this.name,
      email: this.email,
      telefono: this.phone,
      password: this.password
    };

    this.registerService.register(userData).subscribe({
      next: () => {
        this.successMessage = 'Registro exitoso. Redirigiendo al login...';
        setTimeout(() => this.navCtrl.navigateRoot('/login'), 1000);
      },
      error: () => {
        this.errors.push('Error al registrar. Verifica los datos o intenta más tarde.');
      }
    });
  }
}
