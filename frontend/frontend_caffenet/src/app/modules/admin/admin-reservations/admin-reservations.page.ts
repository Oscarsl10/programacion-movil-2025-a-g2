import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BottomBarAdminComponent } from 'src/app/shared/components/admin/bottom-bar-admin/bottom-bar-admin.component';
import { Reserva } from 'src/app/common/interfaces/admin/reserva';
import { Mesa } from 'src/app/common/interfaces/admin/mesa';
import { MesaService } from 'src/app/common/services/mesa.service';
import { ReservaService } from 'src/app/common/services/reserva.service';
import { FormsModule } from '@angular/forms';
import { AuthAdminService } from 'src/app/common/services/authAdminService';

@Component({
  selector: 'app-admin-reservations',
  templateUrl: './admin-reservations.page.html',
  styleUrls: ['./admin-reservations.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, BottomBarAdminComponent, FormsModule]
})
export class AdminReservationsPage {
  mesas: Mesa[] = [];
  reservas: Reserva[] = [];

  nuevaMesa: Mesa = { numero: 0, capacidad: 0, ubicacion: '', precio: 0, estado: 'DISPONIBLE' };
  editando = false;

  constructor(
    private mesaService: MesaService,
    private reservaService: ReservaService,
    private authAdminService: AuthAdminService
  ) {}

  ionViewWillEnter() {
    this.authAdminService.requireLogin(); // Verifica si el usuario está logueado
    this.cargarMesas();
    this.cargarReservas();
  }

  cargarMesas() {
    this.mesaService.getAll().subscribe(res => this.mesas = res.data);
  }

  cargarReservas() {
    this.reservaService.getAll().subscribe(res => this.reservas = res.data);
  }

  guardarMesa() {
    if (this.editando && this.nuevaMesa.id) {
      this.mesaService.update(this.nuevaMesa.id, this.nuevaMesa)
        .subscribe(() => this.onSaveSuccess());
    } else {
      this.mesaService.save(this.nuevaMesa)
        .subscribe(() => this.onSaveSuccess());
    }
  }

  private onSaveSuccess() {
    this.resetFormulario();
    this.cargarMesas();
  }

  editarMesa(mesa: Mesa) {
    this.nuevaMesa = { ...mesa };
    this.editando = true;
  }

  eliminarMesa(id: number) {
    this.mesaService.delete(id).subscribe(() => this.cargarMesas());
  }

  ocuparMesa(mesa: Mesa) {
    this.mesaService.ocuparMesa(mesa.id!)
      .subscribe(() => this.cargarMesas());
  }

  liberarMesa(mesa: Mesa) {
    this.mesaService.liberarMesa(mesa.id!)
      .subscribe(() => this.cargarMesas());
  }

  resetFormulario() {
    this.nuevaMesa = { numero: 0, capacidad: 0, ubicacion: '', precio: 0, estado: 'DISPONIBLE' };
    this.editando = false;
  }
}
