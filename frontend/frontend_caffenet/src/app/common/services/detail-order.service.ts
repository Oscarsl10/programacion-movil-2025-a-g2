import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailOrder } from '../interfaces/user/detail-order';
import { BaseService } from './base.service';
import { ApiResponseDto } from '../interfaces/api-response-dto';
import { Observable } from 'rxjs';
import { PayOrder } from '../interfaces/admin/pay-order';

@Injectable({
  providedIn: 'root'
})
export class DetailOrderService extends BaseService<DetailOrder> {

  constructor(http: HttpClient) {
    super(http, 'v1/detalle_pedido');  // Aquí va el endpoint correcto del backend
  }

  create(detailOrder: DetailOrder) {
    return this.save(detailOrder);
  }
  
  

}