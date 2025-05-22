import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { BottomBarComponent } from "../../../shared/components/user/bottom-bar/bottom-bar.component";
import { MesaService } from 'src/app/common/services/mesa.service';
import { ReservaService } from 'src/app/common/services/reserva.service';
import { UsuarioService } from 'src/app/common/services/usuario.service';
import { Reserva } from 'src/app/common/interfaces/admin/reserva';
import { AuthUserService } from 'src/app/common/services/authUserService';
import { Mesa } from 'src/app/common/interfaces/admin/mesa';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, BottomBarComponent]
})
export class ReservationsPage {
  mesas: Mesa[] = [];
  usuario: any = null;

  nuevaReserva: Partial<Reserva> = {
    fechaInicio: new Date(),
    fechaFin: new Date(),
    numero_personas: 1,
    codigo: '',
    mesa: undefined,
    users: undefined,
    estado: 'Ocupada'
  };

  constructor(
    private mesaService: MesaService,
    private reservaService: ReservaService,
    private usuarioService: UsuarioService,
    private authUserService: AuthUserService,
    private toastController: ToastController
  ) {}

  ionViewWillEnter(): void {
    this.authUserService.requireLogin(); // Verifica si el usuario está logueado
    const userEmail = this.authUserService.getUserEmail();
    if (userEmail) {
      this.usuarioService.getByEmail(userEmail).subscribe(user => {
        this.usuario = user;
      });
    }

    this.mesaService.getAll().subscribe(resp => {
      const all = resp.data || [];
      this.mesas = all.filter(m => m.estado.toUpperCase() === 'DISPONIBLE');
    });
  }

  reservar(): void {
    if (
      !this.nuevaReserva.fechaInicio ||
      !this.nuevaReserva.fechaFin ||
      !this.nuevaReserva.mesa ||
      !this.nuevaReserva.numero_personas ||
      this.nuevaReserva.codigo === ''
    ) {
      this.showToast('Por favor, completa todos los campos requeridos.', 'warning');
      return;
    }

    // Asignar usuario y mesa
    this.nuevaReserva.users = { email: this.usuario.email };
    this.nuevaReserva.mesa = { id: this.nuevaReserva.mesa.id } as Mesa;

    this.reservaService.createReserva(this.nuevaReserva as Reserva).subscribe({
      next: () => {
        this.showToast('Reserva creada exitosamente.', 'success');
        this.resetFormulario();
      },
      error: (err: any) => {
        console.error('Error al crear la reserva', err);
        this.showToast('Hubo un problema al crear la reserva.', 'danger');
      }
    });
  }

  private resetFormulario(): void {
    this.nuevaReserva = {
      fechaInicio: new Date(),
      fechaFin: new Date(),
      numero_personas: 1,
      codigo: '',
      mesa: undefined,
      users: undefined,
      estado: 'Ocupada'
    };
  }

  private async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom',
      color
    });
    toast.present();
  }
}
