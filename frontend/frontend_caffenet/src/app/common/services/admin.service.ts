import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from 'src/app/api.config';
import { Usuario } from '../interfaces/user/usuario';
import { Observable } from 'rxjs';
import { Admin } from '../interfaces/admin/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${API_BASE_URL}/admin`;

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getAll(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.apiUrl);
  }

  // Obtener un usuario por su email
  getByEmail(email: string): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/${encodeURIComponent(email)}`);
  }


  // Actualizar la información del usuario
  updateUser(email: string, data: any): Observable<Admin> {
    return this.http.put<Admin>(`${this.apiUrl}/${encodeURIComponent(email)}`, data);
  }


  // Recuperar contraseña
  recuperarContrasenia(email: string): Observable<any> {
    return this.http.post(`${API_BASE_URL}/recuperar-contrasenia-admin?email=${encodeURIComponent(email)}`, {});
  }
}
