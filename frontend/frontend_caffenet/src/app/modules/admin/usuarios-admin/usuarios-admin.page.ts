import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/common/interfaces/user/usuario';
import { UsuarioService } from 'src/app/common/services/usuario.service';
import { BottomBarAdminComponent } from "../../../shared/components/admin/bottom-bar-admin/bottom-bar-admin.component";
import { AuthAdminService } from 'src/app/common/services/authAdminService';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.page.html',
  styleUrls: ['./usuarios-admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, BottomBarAdminComponent]
})
export class UsuariosAdminPage implements OnInit {

  usuarios: Usuario[] = [];
  usuarioActualizado: Usuario = {
    email: '',
    full_name: '',
    telefono: ''
  };

  constructor(private usuarioService: UsuarioService, private authAdminService: AuthAdminService) {}

  ngOnInit() {
    this.authAdminService.requireLogin(); // Verifica si el usuario está logueado
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getAll().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });
  }

  // Actualizar un usuario
  actualizarUsuario() {
    if (this.usuarioActualizado.email) {
      const data = {
        full_name: this.usuarioActualizado.full_name,
        telefono: this.usuarioActualizado.telefono
      };
      this.usuarioService.updateUser(this.usuarioActualizado.email, data).subscribe(
        (usuario) => {
          console.log('Usuario actualizado:', usuario);
          this.cargarUsuarios(); // Recargar la lista de usuarios
        },
        (error) => {
          console.error('Error al actualizar el usuario:', error);
        }
      );
    }
  }

  // Recuperar la contraseña
  recuperarContrasenia(email: string) {
    this.usuarioService.recuperarContrasenia(email).subscribe(
      (response) => {
        console.log('Recuperación de contraseña:', response);
      },
      (error) => {
        console.error('Error en la recuperación de contraseña:', error);
      }
    );
  }
}


