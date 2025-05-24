export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  direccion: string;
  contrasena: string;
  rol: 'dueño' | 'paseador' | 'admin';
  tokenRecuperacion?: string;
  expiracionToken?: Date;
}
