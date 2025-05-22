import { Usuario } from "./usuario";

export interface carBuy {
  id?: number; // ← hazlo opcional con ?
  fechaCreacion: string;
  estado: 'ACTIVO' | 'COMPRADO' | 'RETIRADO' | 'SOLICITADO';
  cantidad?: number;
  producto: {
    id: number;
    nombre?: string;
    descripcion?: string;
    estado?: string;
    precio: number;
    stock?: number;
  };
  total: number;
  user?: Usuario;
}
