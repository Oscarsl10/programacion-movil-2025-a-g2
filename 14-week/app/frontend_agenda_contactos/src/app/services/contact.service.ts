import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService<Contact> {

  constructor(http: HttpClient) {
    super(http, 'v1/contact');
   }
}
