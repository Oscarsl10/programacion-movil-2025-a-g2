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

  // Validaciones personalizadas
private isValidEmail(email: string): boolean {
  // Crea la expresión regular como un objeto RegExp
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailPattern.test(email); // usa test() directamente con la expresión regular
}

private isValidPhone(phone: string): boolean {
  // Crea la expresión regular como un objeto RegExp
  const phonePattern = /^\d{1,10}$/;
  return phonePattern.test(phone); // usa test() directamente con la expresión regular
}


  register() {
    this.errors = [];
    this.successMessage = '';

    // Validaciones
    if (!this.name || this.name.trim().length < 3) {
      this.errors.push('El nombre es obligatorio y debe tener al menos 3 caracteres.');
    }

    if (!this.email || !this.isValidEmail(this.email)) {
      this.errors.push('Debe ingresar un correo electrónico válido.');
    }

    if (!this.phone || !this.isValidPhone(this.phone)) {
      this.errors.push('El teléfono es obligatorio y debe tener entre 7 y 10 dígitos numéricos.');
    }

    if (!this.password || this.password.length < 6) {
      this.errors.push('La contraseña es obligatoria y debe tener al menos 6 caracteres.');
    }

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
        setTimeout(() => this.navCtrl.navigateRoot('/login'), 2000);
      },
      error: () => {
        this.errors.push('Error al registrar. Verifica los datos o intenta más tarde.');
      }
    });
  }
}
