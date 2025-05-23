import { Mesa } from './mesa';

export interface Reserva {
  email: string;
  id?: number;
  fechaInicio: Date;
  fechaFin: Date;
  numero_personas: number;
  codigo: string;
  estado: string;
  mesa: Mesa;
  users?: any;

}
