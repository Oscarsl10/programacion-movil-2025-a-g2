import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { UserPage } from '../pages/user/user.page';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> { // Cambia 'any' por el tipo de tu entidad
  constructor(http: HttpClient) {
    super(http, 'v1/user');
  }
}
