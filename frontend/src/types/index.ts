// Tipos principales del sistema FROS

export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  rol: RolUsuario;
  estado: EstadoUsuario;
  fechaRegistro: string;
  fechaActualizacion: string;
}

export interface Espacio {
  id: string;
  numero: number;
  estado: EstadoEspacio;
  temperaturaMin?: number;
  temperaturaMax?: number;
  notas?: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface Reserva {
  id: string;
  clienteId: string;
  fechaInicio: string;
  fechaFin: string;
  estado: EstadoReserva;
  precioTotal: number;
  descuento: number;
  notas?: string;
  codigoAcceso?: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  cliente: Usuario;
  espacios: ReservaEspacio[];
}

export interface ReservaEspacio {
  reservaId: string;
  espacioId: string;
  fechaAsignacion: string;
  espacio: Espacio;
}

export interface Pago {
  id: string;
  reservaId: string;
  clienteId: string;
  monto: number;
  metodoPago: MetodoPago;
  estado: EstadoPago;
  referencia?: string;
  fechaPago?: string;
  fechaVencimiento?: string;
  fechaCreacion: string;
}

export interface Configuracion {
  clave: string;
  valor: string;
  descripcion?: string;
  tipo: TipoConfiguracion;
  fechaActualizacion: string;
}

export interface InventarioCliente {
  id: string;
  espacioId: string;
  clienteId: string;
  producto: string;
  cantidad: number;
  unidadMedida: string;
  fechaVencimiento?: string;
  temperaturaRequerida?: number;
  notas?: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface RegistroAcceso {
  id: string;
  usuarioId: string;
  reservaId?: string;
  tipoAcceso: TipoAcceso;
  fechaHora: string;
  exitoso: boolean;
  direccionIP?: string;
  userAgent?: string;
  notas?: string;
}

// Enums
export enum RolUsuario {
  ADMIN = 'ADMIN',
  OPERADOR = 'OPERADOR',
  CLIENTE = 'CLIENTE',
}

export enum EstadoUsuario {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
  PENDIENTE = 'PENDIENTE',
  SUSPENDIDO = 'SUSPENDIDO',
}

export enum EstadoEspacio {
  LIBRE = 'LIBRE',
  RESERVADO = 'RESERVADO',
  OCUPADO = 'OCUPADO',
  MANTENIMIENTO = 'MANTENIMIENTO',
}

export enum EstadoReserva {
  PENDIENTE = 'PENDIENTE',
  CONFIRMADA = 'CONFIRMADA',
  ACTIVA = 'ACTIVA',
  COMPLETADA = 'COMPLETADA',
  CANCELADA = 'CANCELADA',
  VENCIDA = 'VENCIDA',
}

export enum EstadoPago {
  PENDIENTE = 'PENDIENTE',
  PAGADO = 'PAGADO',
  VENCIDO = 'VENCIDO',
  REEMBOLSADO = 'REEMBOLSADO',
}

export enum MetodoPago {
  EFECTIVO = 'EFECTIVO',
  TRANSFERENCIA = 'TRANSFERENCIA',
  TARJETA_CREDITO = 'TARJETA_CREDITO',
  TARJETA_DEBITO = 'TARJETA_DEBITO',
  CHEQUE = 'CHEQUE',
}

export enum TipoConfiguracion {
  TEXTO = 'TEXTO',
  NUMERO = 'NUMERO',
  BOOLEANO = 'BOOLEANO',
  JSON = 'JSON',
}

export enum TipoAcceso {
  WEB_LOGIN = 'WEB_LOGIN',
  FISICO_QR = 'FISICO_QR',
  API = 'API',
  ADMIN_PANEL = 'ADMIN_PANEL',
}

// Tipos para formularios y estado de la aplicación
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  invitadoPor?: string;
}

export interface ReservaForm {
  fechaInicio: Date;
  fechaFin: Date;
  cantidadEspacios: number;
  espaciosSeleccionados: string[];
  notas?: string;
}

export interface BusquedaEspacios {
  fechaInicio: Date;
  fechaFin: Date;
  cantidadEspacios: number;
  temperaturaMin?: number;
  temperaturaMax?: number;
}

export interface DashboardStats {
  espaciosTotal: number;
  espaciosLibres: number;
  espaciosOcupados: number;
  espaciosReservados: number;
  espaciosMantenimiento: number;
  reservasActivas: number;
  clientesActivos: number;
  ingresosMes: number;
  ocupacionPorcentaje: number;
}

// Tipos para respuestas de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: any;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Tipos para autenticación
export interface AuthState {
  isAuthenticated: boolean;
  user: Usuario | null;
  token: string | null;
  loading: boolean;
}

export interface AuthContextType {
  user: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterForm) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Usuario>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}