import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Reserva } from '../interfaces/admin/reserva';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/api.config';
import { ApiResponseDto } from '../interfaces/api-response-dto';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  
  private baseUrl = `${API_BASE_URL}/v1/reserva`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponseDto<Reserva[]>> {
    return this.http.get<ApiResponseDto<Reserva[]>>(this.baseUrl);
  }

  getById(id: number): Observable<ApiResponseDto<Reserva>> {
    return this.http.get<ApiResponseDto<Reserva>>(`${this.baseUrl}/${id}`);
  }

  createReserva(reserva: Reserva): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/addReservation`, reserva);
  }

  finalizarReserva(id: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}/finalizar`, {});
  }

  liberarMesasFinalizadas(): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/liberar`, {});
  }

  getReservaByCodigo(codigo: string): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.baseUrl}/by-codigo`, { params: { codigo } });
  }
  delete(id: number): Observable<ApiResponseDto<Reserva>> {
    return this.http.delete<ApiResponseDto<Reserva>>(`${this.baseUrl}/${id}`);
  }
}
