import { DetailOrder } from "../user/detail-order";
import { Usuario } from "../user/usuario";

export interface PayOrder {
    id?: string;
    metodo_Pago: string;
    monto: number;
    detalle_pedido: DetailOrder;
    users: Usuario;
}
