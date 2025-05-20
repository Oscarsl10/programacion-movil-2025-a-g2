import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/user/usuario';
import { API_BASE_URL } from 'src/app/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${API_BASE_URL}/user`;

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Obtener un usuario por su email
  getByEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${encodeURIComponent(email)}`);
  }


  // Actualizar la información del usuario
  updateUser(email: string, data: any): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${encodeURIComponent(email)}`, data);
  }


  // Recuperar contraseña
  recuperarContrasenia(email: string): Observable<any> {
    return this.http.post(`${API_BASE_URL}/recuperar-contrasenia?email=${encodeURIComponent(email)}`, {});
  }
  
}
