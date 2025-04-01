import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { FormularioComponent } from "../../components/formulario/formulario.component";
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-enfermero',
  templateUrl: './enfermero.page.html',
  styleUrls: ['./enfermero.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, FormularioComponent, IonicModule, ReactiveFormsModule]
})
export class EnfermeroPage {

  additionalFields = [
    { label: 'Turno asignado', name: 'turno', type: 'text' },
    { label: 'Área de atención', name: 'area', type: 'text' }
  ];

}
