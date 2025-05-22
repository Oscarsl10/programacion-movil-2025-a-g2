import { DetailOrder } from "../user/detail-order";
import { Usuario } from "../user/usuario";

export interface Comprobante {
    id: number;
    fecha_emision: string;
    detalle_pedido: DetailOrder;
    users: Usuario;
    pago: PayOrder;
}