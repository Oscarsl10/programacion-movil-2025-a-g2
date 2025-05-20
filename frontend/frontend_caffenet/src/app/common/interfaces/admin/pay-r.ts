import { Reserva } from "./reserva";

export interface PayR {
  id?: number;
  metodo_pago: string;
  monto?: number;    // opcional al crear, luego vendrá lleno
  reserva: Reserva;  // <-- aquí cambiamos a la interfaz completa
  users: { email: string };    // ¡aquí añadimos users!
}