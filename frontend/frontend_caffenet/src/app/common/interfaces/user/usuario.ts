export interface Usuario {
  id?: number; // ← Asegúrate de tener esto
  email: string;
  full_name: string;
  password?: string; // opcional por seguridad
  telefono?: string;
  direccion?: string;
}