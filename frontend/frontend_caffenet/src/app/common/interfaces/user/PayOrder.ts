interface PayOrder {
  id: number;
  metodo_pago: string;
  monto: number;
  detalle_pedido: {
    id: number;
 };
  users: {
    id: number;
    full_name: string;
    email: string;
  };
}
