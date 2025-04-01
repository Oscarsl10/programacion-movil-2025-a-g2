import { Component, Input, OnInit } from '@angular/core';
import { IonCard } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true
})
export class FormularioComponent  implements OnInit {

  @Input() additionalFields: { label: string; name: string; type: string }[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    // Añadir los campos dinámicos al FormGroup
    this.additionalFields.forEach(field => {
      this.form.addControl(field.name, this.fb.control('', Validators.required));
    });
  }
  

  onSubmit() { console.log('Agregar', this.form.value); }
  onModify() { console.log('Modificar', this.form.value); }
  onDelete() { console.log('Eliminar', this.form.value); }
  onConsult() { console.log('Consultar', this.form.value); }
}
