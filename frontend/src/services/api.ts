import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor para agregar token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('fros_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor para manejo de errores
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('fros_token');
          localStorage.removeItem('fros_user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Métodos de autenticación
  async login(email: string, password: string): Promise<ApiResponse<any>> {
    const response = await this.api.post('/auth/login', { email, password });
    return response.data;
  }

  async register(data: any): Promise<ApiResponse<any>> {
    const response = await this.api.post('/auth/register', data);
    return response.data;
  }

  async getProfile(): Promise<ApiResponse<any>> {
    const response = await this.api.get('/auth/profile');
    return response.data;
  }

  async updateProfile(data: any): Promise<ApiResponse<any>> {
    const response = await this.api.put('/auth/profile', data);
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<any>> {
    const response = await this.api.put('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  }

  // Métodos de usuarios
  async getUsuarios(params?: any): Promise<ApiResponse<any>> {
    const response = await this.api.get('/usuarios', { params });
    return response.data;
  }

  async getUsuario(id: string): Promise<ApiResponse<any>> {
    const response = await this.api.get(`/usuarios/${id}`);
    return response.data;
  }

  async updateUsuario(id: string, data: any): Promise<ApiResponse<any>> {
    const response = await this.api.put(`/usuarios/${id}`, data);
    return response.data;
  }

  async deleteUsuario(id: string): Promise<ApiResponse<any>> {
    const response = await this.api.delete(`/usuarios/${id}`);
    return response.data;
  }

  async inviteUsuario(data: any): Promise<ApiResponse<any>> {
    const response = await this.api.post('/usuarios/invite', data);
    return response.data;
  }

  async activateUsuario(id: string): Promise<ApiResponse<any>> {
    const response = await this.api.put(`/usuarios/${id}/activate`);
    return response.data;
  }

  // Métodos de espacios
  async getEspacios(): Promise<ApiResponse<any>> {
    const response = await this.api.get('/espacios');
    return response.data;
  }

  async getEspacioGrid(): Promise<ApiResponse<any>> {
    const response = await this.api.get('/espacios/grid');
    return response.data;
  }

  async getEspaciosDisponibles(params?: any): Promise<ApiResponse<any>> {
    const response = await this.api.get('/espacios/available', { params });
    return response.data;
  }

  async getEspacio(id: string): Promise<ApiResponse<any>> {
    const response = await this.api.get(`/espacios/${id}`);
    return response.data;
  }

  async updateEspacio(id: string, data: any): Promise<ApiResponse<any>> {
    const response = await this.api.put(`/espacios/${id}`, data);
    return response.data;
  }

  async updateEspacioStatus(id: string, estado: string): Promise<ApiResponse<any>> {
    const response = await this.api.put(`/espacios/${id}/status`, { estado });
    return response.data;
  }

  async getEspacioHistory(id: string): Promise<ApiResponse<any>> {
    const response = await this.api.get(`/espacios/${id}/history`);
    return response.data;
  }

  // Métodos de reservas
  async getReservas(params?: any): Promise<ApiResponse<any>> {
    const response = await this.api.get('/reservas', { params });
    return response.data;
  }

  async createReserva(data: any): Promise<ApiResponse<any>> {
    const response = await this.api.post('/reservas', data);
    return response.data;
  }

  async searchEspacios(data: any): Promise<ApiResponse<any>> {
    const response = await this.api.get('/reservas/search', { params: data });
    return response.data;
  }

  async getMyReservations(): Promise<ApiResponse<any>> {
    const response = await this.api.get('/reservas/my-reservations');
    return response.data;
  }

  async getReserva(id: string): Promise<ApiResponse<any>> {
    const response = await this.api.get(`/reservas/${id}`);
    return response.data;
  }

  async updateReserva(id: string, data: any): Promise<ApiResponse<any>> {
    const response = await this.api.put(`/reservas/${id}`, data);
    return response.data;
  }

  async approveReserva(id: string): Promise<ApiResponse<any>> {
    const response = await this.api.put(`/reservas/${id}/approve`);
    return response.data;
  }

  async rejectReserva(id: string, motivo?: string): Promise<ApiResponse<any>> {
    const response = await this.api.put(`/reservas/${id}/reject`, { motivo });
    return response.data;
  }

  async cancelReserva(id: string): Promise<ApiResponse<any>> {
    const response = await this.api.delete(`/reservas/${id}`);
    return response.data;
  }

  async getReservaQR(id: string): Promise<ApiResponse<any>> {
    const response = await this.api.get(`/reservas/${id}/qr`);
    return response.data;
  }

  // Métodos de pagos
  async getPagos(params?: any): Promise<ApiResponse<any>> {
    const response = await this.api.get('/pagos', { params });
    return response.data;
  }

  async createPago(data: any): Promise<ApiResponse<any>> {
    const response = await this.api.post('/pagos', data);
    return response.data;
  }

  async getMyPayments(): Promise<ApiResponse<any>> {
    const response = await this.api.get('/pagos/my-payments');
    return response.data;
  }

  async getPago(id: string): Promise<ApiResponse<any>> {
    const response = await this.api.get(`/pagos/${id}`);
    return response.data;
  }

  async confirmPago(id: string): Promise<ApiResponse<any>> {
    const response = await this.api.put(`/pagos/${id}/confirm`);
    return response.data;
  }

  async getInvoice(reservaId: string): Promise<ApiResponse<any>> {
    const response = await this.api.get(`/pagos/invoice/${reservaId}`);
    return response.data;
  }

  // Métodos de configuración
  async getConfiguracion(): Promise<ApiResponse<any>> {
    const response = await this.api.get('/configuracion');
    return response.data;
  }

  async updateConfiguracion(data: any): Promise<ApiResponse<any>> {
    const response = await this.api.put('/configuracion', data);
    return response.data;
  }

  async getPublicConfig(): Promise<ApiResponse<any>> {
    const response = await this.api.get('/configuracion/public');
    return response.data;
  }

  // Métodos de dashboard
  async getDashboardStats(): Promise<ApiResponse<any>> {
    const response = await this.api.get('/dashboard/stats');
    return response.data;
  }

  async getOccupancyReport(params?: any): Promise<ApiResponse<any>> {
    const response = await this.api.get('/dashboard/occupancy', { params });
    return response.data;
  }

  async getRevenueReport(params?: any): Promise<ApiResponse<any>> {
    const response = await this.api.get('/dashboard/revenue', { params });
    return response.data;
  }

  async getClientsReport(params?: any): Promise<ApiResponse<any>> {
    const response = await this.api.get('/dashboard/clients', { params });
    return response.data;
  }

  async exportReport(type: string, params?: any): Promise<any> {
    const response = await this.api.get(`/dashboard/export/${type}`, {
      params,
      responseType: 'blob',
    });
    return response.data;
  }
}

export const apiService = new ApiService();