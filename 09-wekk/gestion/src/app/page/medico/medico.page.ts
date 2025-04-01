import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { FormularioComponent } from 'src/app/components/formulario/formulario.component';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.page.html',
  styleUrls: ['./medico.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FormularioComponent]
})
export class MedicoPage  {

  additionalFields = [
    { label: 'Especialidad', name: 'especialidad', type: 'text' },
    { label: 'Número de licencia médica', name: 'licencia', type: 'text' }
  ];  

}
