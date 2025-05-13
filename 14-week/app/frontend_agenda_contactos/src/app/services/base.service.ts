import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponseDto } from '../interfaces/api-response-dto';
import { API_BASE_URL } from '../api.config';


export class BaseService<T> {
  protected apiUrl: string;

  constructor(protected http: HttpClient, endpoint: string) {
    this.apiUrl = `${API_BASE_URL}/${endpoint}`;
  }

  getAll(): Observable<ApiResponseDto<T[]>> {
    return this.http.get<ApiResponseDto<T[]>>(this.apiUrl);
  }

  getById(id: number): Observable<ApiResponseDto<T>> {
    return this.http.get<ApiResponseDto<T>>(`${this.apiUrl}/${id}`);
  }

  save(entity: T): Observable<ApiResponseDto<T>> {
    return this.http.post<ApiResponseDto<T>>(this.apiUrl, entity);
  }

  update(id: number, entity: T): Observable<ApiResponseDto<T>> {
    return this.http.put<ApiResponseDto<T>>(`${this.apiUrl}/${id}`, entity);
  }

  delete(id: number): Observable<ApiResponseDto<T>> {
    return this.http.delete<ApiResponseDto<T>>(`${this.apiUrl}/${id}`);
  }
}