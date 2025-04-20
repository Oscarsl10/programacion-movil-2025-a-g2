import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class UserPage implements OnInit {
  users: User[] = [];

  // No incluir id al crear un nuevo usuario
  user: User = { name: '', email: '' } as User;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  // Cargar todos los usuarios
  loadUsers() {
    this.userService.getAll().subscribe(
      (response) => {
        if (response.status) {
          this.users = response.data.filter(u => u.status); // Solo mostrar usuarios con 'state' true
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
    this.userService.save(this.user).subscribe(
      (response) => {
        if (response.status) {  // <-- usa 'status' si tu backend lo devuelve así
          this.user = { id: 0, name: '', email: '' };
          this.loadUsers();
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
  updateUser() {
    if (this.user && this.user.id) {
      const userToUpdate: User = {
        id: this.user.id,
        name: this.user.name,
        email: this.user.email,
      };

      this.userService.update(this.user.id, userToUpdate).subscribe(
        response => {
          console.log('Usuario actualizado:', response);
          this.user = { name: '', email: '' } as User;
          this.loadUsers();
        },
        error => {
          console.error('Error al actualizar el usuario:', error);
        }
      );
    }
  }

  // Editar un usuario
  editUser(u: User) {
    this.user = { ...u };
  }

  // Eliminar un usuario
  deleteUser(id: number) {
    this.userService.delete(id).subscribe(
      (response) => {
        // Si la respuesta contiene el mensaje "Registro eliminado"
        if (response.message === "Registro eliminado") {
          console.log('Usuario eliminado correctamente');
          this.loadUsers();  // Recargar la lista de usuarios
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
