import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { carBuy } from '../interfaces/user/carBuy';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarBuyService extends BaseService<carBuy> {
  constructor(http: HttpClient) {
    super(http, 'v1/carbuys');
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteAll`);
  }

  deleteById(id: number) {
    // Usamos método base delete para mantener consistencia
    return super.delete(id);
  }
}
