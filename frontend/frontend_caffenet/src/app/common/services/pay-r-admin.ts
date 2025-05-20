import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_BASE_URL } from "src/app/api.config";
import { PayR } from "../interfaces/admin/pay-r";



@Injectable({ providedIn: 'root' })
export class PayRAdminService {
    private baseUrl = `${API_BASE_URL}/v1/pago/reserva`;

    constructor(private http: HttpClient) { }

    addPago(pago: PayR): Observable<PayR> {
        return this.http.post<PayR>(`${this.baseUrl}/add`, pago);
    }

    getPagosByCodigo(codigo: string): Observable<PayR[]> {
    return this.http.get<PayR[]>(`${this.baseUrl}/by-codigo`, {
      params: { codigo }
    });
  }
}