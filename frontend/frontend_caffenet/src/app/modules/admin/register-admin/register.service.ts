import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/api.config';
import { AuthAdminService } from 'src/app/common/services/authAdminService';

@Injectable({
  providedIn: 'root'
})
export class RegisterService implements OnInit {
  
  private apiUrl = '${API_BASE_URL}/addAdmin';

  constructor(private http: HttpClient, private authAdminService: AuthAdminService) {}

  ngOnInit() {
    this.authAdminService.requireLogin(); // Verifica si el usuario está logueado
  }

  register(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
