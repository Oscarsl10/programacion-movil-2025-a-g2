import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BottomBarComponent } from 'src/app/shared/components/user/bottom-bar/bottom-bar.component';
import { ApiResponseDto } from 'src/app/common/interfaces/api-response-dto';
import { Reserva } from 'src/app/common/interfaces/admin/reserva';
import { ReservaService } from 'src/app/common/services/reserva.service';
import { ToastController } from '@ionic/angular';
import { AuthUserService } from 'src/app/common/services/authUserService';


@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.page.html',
  styleUrls: ['./my-reservations.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,BottomBarComponent]
})
export class MyReservationsPage {

  reservas: Reserva[] = [];
  emailUsuario: string = '';
  loading: boolean | undefined;

  

  constructor(
    private reservaService: ReservaService,
    private toastController: ToastController,
    private authUserService: AuthUserService
  ) {}

  ionViewWillEnter() {
    this.authUserService.requireLogin(); // Verifica si el usuario está logueado
    this.emailUsuario = sessionStorage.getItem('email') || '';
    this.cargarReservas();
     this.loading = false
  }

  cargarReservas() {
  this.reservaService.getAll().subscribe({
    next: (response: ApiResponseDto<Reserva[]>) => {
      console.log('Reservas recibidas:', response.data);
      this.reservas = response.data.filter(r => r.users?.email === this.emailUsuario);

    },
    error: () => {
      this.presentToast('Error al cargar las reservas');
    }
  });
}

  cancelarReserva(id: number): void {
  this.reservaService.delete(id).subscribe({
    next: () => {
      this.reservas = this.reservas.filter(r => r.id !== id);
      this.presentToast('Reserva cancelada con éxito');
    },
    error: (err: any) => {
      console.error('Error al cancelar la reserva', err);
      this.presentToast('Error al cancelar la reserva');

    }
  });
}


  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }
}
