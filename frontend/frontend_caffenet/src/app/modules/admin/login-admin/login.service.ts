import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/api.config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `${API_BASE_URL}/loginAdmin`;

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  recuperarContrasenia(email: string): Observable<any> {
    return this.http.post(`${API_BASE_URL}/recuperar-contrasenia-admin?email=${encodeURIComponent(email)}`, {});
  }
  
}
