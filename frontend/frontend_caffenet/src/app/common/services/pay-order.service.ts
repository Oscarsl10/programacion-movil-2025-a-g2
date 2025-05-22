import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { PayOrder } from '../interfaces/admin/pay-order';
import { HttpClient } from '@angular/common/http';
import { ApiResponseDto } from '../interfaces/api-response-dto';
import { DetailOrder } from '../interfaces/user/detail-order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayOrderService extends BaseService<PayOrder> {

  constructor(http: HttpClient) {
    super(http, 'v1/pago');  
  }
  
  findAll(): Observable<PayOrder[]> {
    return this.http.get<PayOrder[]>(`${this.apiUrl}`);
  }

}
