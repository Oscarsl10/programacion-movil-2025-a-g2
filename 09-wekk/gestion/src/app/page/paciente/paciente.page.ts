import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { FormularioComponent } from "../../components/formulario/formulario.component";

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonicModule, FormularioComponent]
})
export class PacientePage  {

  additionalFields = [
    { label: 'Número de historia clínica', name: 'historia', type: 'text' },
    { label: 'Tipo de afiliación', name: 'afiliacion', type: 'text' }
  ];

}
