import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_BASE_URL } from "src/app/api.config";
import { Comprobante } from "../interfaces/admin/comprobanteReserva";
import { ApiResponseDto } from "../interfaces/api-response-dto";

@Injectable({ providedIn: 'root' })
export class ComprobanteService {
    private baseUrl = `${API_BASE_URL}/v1/comprobante`;

    constructor(private http: HttpClient) { }

    generarComprobante(pagoId: number): Observable<ApiResponseDto<Comprobante>> {
        return this.http.post<ApiResponseDto<Comprobante>>(
            `${this.baseUrl}/generar_comprobante`,
            null,
            { params: { pagoId: pagoId.toString() } }
        );
    }

    obtenerPorPago(pagoId: number): Observable<ApiResponseDto<Comprobante>> {
        // GET /by-producto/{pagoId}
        return this.http.get<ApiResponseDto<Comprobante>>(
            `${this.baseUrl}/by-producto/${pagoId}`
        );
    }

    obtenerTodos(): Observable<ApiResponseDto<Comprobante[]>> {
        return this.http.get<ApiResponseDto<Comprobante[]>>(this.baseUrl);
    }
}