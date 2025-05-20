import { Producto } from "../admin/producto";
import { carBuy } from "./carBuy";
import { Usuario } from "./usuario";

export interface DetailOrder {
    fecha_emision: Date;
    carBuy: carBuy;
    producto: Producto;
    users: Usuario;
}
