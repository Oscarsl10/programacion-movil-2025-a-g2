import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule]
})
export class ContactPage implements OnInit {

  contacts: Contact[] = [];

  // No incluir id al crear un nuevo usuario
  contact: Contact = { name: '', phone: '' } as Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.loadContacts();
  }

  // Cargar todos los usuarios
  loadContacts() {
    this.contactService.getAll().subscribe(
      (response) => {
        if (response.status) {
          this.contacts = response.data.filter(c => c.status); // Solo mostrar usuarios con 'state' true
        } else {
          console.error('Error al cargar usuarios:', response.message);
        }
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  // Guardar un nuevo usuario
  save() {
    this.contactService.save(this.contact).subscribe(
      (response) => {
        if (response.status) {  // <-- usa 'status' si tu backend lo devuelve así
          this.contact = { id: 0, name: '', phone: '' };
          this.loadContacts();
        } else {
          console.error('Error al guardar el usuario:', response.message);
        }
      },
      (error) => {
        console.error('Error al guardar el usuario:', error);
      }
    );
  }

  // Actualizar un usuario
  updateContact() {
    if (this.contact && this.contact.id) {
      const userToUpdate: Contact = {
        id: this.contact.id,
        name: this.contact.name,
        phone: this.contact.phone,
      };

      this.contactService.update(this.contact.id, userToUpdate).subscribe(
        response => {
          console.log('Usuario actualizado:', response);
          this.contact = { name: '', phone: '' } as Contact;
          this.loadContacts();
        },
        error => {
          console.error('Error al actualizar el usuario:', error);
        }
      );
    }
  }

  // Editar un usuario
  editContact(c: Contact) {
    this.contact = { ...c };
  }

  // Eliminar un usuario
  deleteContact(id?: number) {
    if (!id) return;
    this.contactService.delete(id).subscribe(
      (response) => {
        // Si la respuesta contiene el mensaje "Registro eliminado"
        if (response.message === "Registro eliminado") {
          console.log('Usuario eliminado correctamente');
          this.loadContacts();  // Recargar la lista de usuarios
        } else {
          console.error('Error al eliminar el usuario:', response.message);
        }
      },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }

}
