export interface Comprobante {
  id: number;
  fecha_emision: string;
  reserva: {
    id: number;
    codigo: string;
    fechaInicio: string;
    fechaFin: string;
    mesa: { numero: number; ubicacion: string; };
    users: { email: string };
  };
  users: { email: string; full_name: string };
  pagoReserva: {
    id: number;
    metodo_pago: string;
    monto: number;
  };
}