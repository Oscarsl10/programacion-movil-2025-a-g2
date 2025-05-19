export interface Usuario {
    email: string;
    full_name: string;
    password?: string; // opcional por seguridad
    telefono?: string;
  }