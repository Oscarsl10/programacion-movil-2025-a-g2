import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Producto } from '../interfaces/producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends BaseService<Producto> {
  constructor(http: HttpClient) {
    super(http, 'v1/producto'); 
  }
}
