import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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
export class ReservationsPage implements OnInit {
  mesas: Mesa[] = [];
  usuario: any = null;

  // Inicializar solo propiedades definidas en Reserva
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
    private authUserService: AuthUserService
  ) { }

  ngOnInit(): void {
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
    // Validación básica
    if (!this.nuevaReserva.fechaInicio || !this.nuevaReserva.fechaFin || !this.nuevaReserva.mesa || !this.nuevaReserva.numero_personas || this.nuevaReserva.codigo === '') {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    // Asignar usuario y mesa
    this.nuevaReserva.users = { email: this.usuario.email };
    this.nuevaReserva.mesa = { id: this.nuevaReserva.mesa.id } as Mesa;

    this.reservaService.createReserva(this.nuevaReserva as Reserva).subscribe({
      next: () => {
        alert('Reserva creada exitosamente.');
        this.resetFormulario();
      },
      error: (err: any) => {
        console.error('Error al crear la reserva', err);
        alert('Hubo un problema al crear la reserva.');
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
}
