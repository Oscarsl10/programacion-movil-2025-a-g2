import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCardHeader, IonCardTitle, IonCardContent, IonCard, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  
  constructor(private router: Router) {}

  goToMedico() {
    this.router.navigate(['/medico']);
  }

  goToEnfermero() {
    this.router.navigate(['/enfermero']);
  }

  goToRecepcionista() {
    this.router.navigate(['/recepcionista']);
  }

  goToPaciente() {
    this.router.navigate(['/paciente']);
  }
}
