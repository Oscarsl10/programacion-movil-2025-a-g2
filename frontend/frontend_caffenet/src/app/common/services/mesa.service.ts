import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Mesa } from '../interfaces/admin/mesa';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../interfaces/admin/reserva';
import { API_BASE_URL } from 'src/app/api.config';
import { ApiResponseDto } from '../interfaces/api-response-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  private baseUrl = `${API_BASE_URL}/v1/mesas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponseDto<Mesa[]>> {
    return this.http.get<ApiResponseDto<Mesa[]>>(this.baseUrl);
  }

  save(mesa: Mesa): Observable<ApiResponseDto<Mesa>> {
    return this.http.post<ApiResponseDto<Mesa>>(this.baseUrl, mesa);
  }

  update(id: number, mesa: Mesa): Observable<ApiResponseDto<Mesa>> {
    return this.http.put<ApiResponseDto<Mesa>>(`${this.baseUrl}/${id}`, mesa);
  }

  delete(id: number): Observable<ApiResponseDto<Mesa>> {
    return this.http.delete<ApiResponseDto<Mesa>>(`${this.baseUrl}/${id}`);
  }

  ocuparMesa(id: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}/ocupar`, {});
  }

  liberarMesa(id: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}/liberar`, {});
  }

  estaDisponible(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/${id}/disponible`);
  }
}
