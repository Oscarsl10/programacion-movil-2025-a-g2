import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_BASE_URL } from "src/app/api.config";
import { Comprobante } from "../interfaces/admin/comprobanteReserva";
import { ApiResponseDto } from "../interfaces/api-response-dto";

@Injectable({ providedIn: 'root' })
export class ComprobanteAdminService {
    private baseUrl = `${API_BASE_URL}/v1/comprobante_reserva`;

    constructor(private http: HttpClient) { }

    generarComprobante(pagoId: number): Observable<ApiResponseDto<Comprobante>> {
        // POST /generar?pagoId=…
        return this.http.post<ApiResponseDto<Comprobante>>(
            `${this.baseUrl}/generar`,
            null,
            { params: { pagoId: pagoId.toString() } }
        );
    }

    obtenerPorPago(pagoId: number): Observable<ApiResponseDto<Comprobante>> {
        // hace GET /by-pago/{pagoId}
        return this.http.get<ApiResponseDto<Comprobante>>(
            `${this.baseUrl}/by-pago/${pagoId}`
        );
    }

    obtenerTodos() {
        return this.http.get<any>(this.baseUrl);
    }
}