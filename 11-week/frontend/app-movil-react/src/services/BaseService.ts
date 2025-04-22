import axios from 'axios';
import { ApiResponseDto } from '../interfaces/ApiResponseDto';

export class BaseService<T> {
  protected apiUrl: string;

  constructor(endpoint: string) {
    this.apiUrl = `http://localhost:8082/api/${endpoint}`;
  }

  getAll() {
    return axios.get<ApiResponseDto<T[]>>(this.apiUrl);
  }

  getById(id: number) {
    return axios.get<ApiResponseDto<T>>(`${this.apiUrl}/${id}`);
  }

  save(entity: T) {
    return axios.post<ApiResponseDto<T>>(this.apiUrl, entity);
  }

  update(id: number, entity: T) {
    return axios.put<ApiResponseDto<T>>(`${this.apiUrl}/${id}`, entity);
  }

  delete(id: number) {
    return axios.delete<ApiResponseDto<T>>(`${this.apiUrl}/${id}`);
  }
}