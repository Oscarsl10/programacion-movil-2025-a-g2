import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { FormularioComponent } from "../../components/formulario/formulario.component";

@Component({
  selector: 'app-recepcionista',
  templateUrl: './recepcionista.page.html',
  styleUrls: ['./recepcionista.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonicModule, FormularioComponent]
})
export class RecepcionistaPage {

  additionalFields = [
    { label: 'Horario laboral', name: 'horario', type: 'text' },
    { label: 'Extensión telefónica', name: 'extension', type: 'text' }
  ];

}
