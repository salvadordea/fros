import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Usuario, AuthState, RegisterForm } from '@/types';
import { apiService } from '@/services/api';
import toast from 'react-hot-toast';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterForm) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Usuario>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,

      setLoading: (loading: boolean) => {
        set({ loading });
      },

      login: async (email: string, password: string) => {
        try {
          set({ loading: true });

          const response = await apiService.login(email, password);

          if (response.success && response.data) {
            const { token, usuario } = response.data;

            localStorage.setItem('fros_token', token);
            localStorage.setItem('fros_user', JSON.stringify(usuario));

            set({
              isAuthenticated: true,
              user: usuario,
              token,
              loading: false,
            });

            toast.success(`¡Bienvenido, ${usuario.nombre}!`);
          } else {
            throw new Error(response.error?.message || 'Error en el login');
          }
        } catch (error: any) {
          set({ loading: false });
          const message = error.response?.data?.error?.message || error.message || 'Error en el login';
          toast.error(message);
          throw error;
        }
      },

      register: async (data: RegisterForm) => {
        try {
          set({ loading: true });

          const response = await apiService.register(data);

          if (response.success) {
            set({ loading: false });
            toast.success('Registro exitoso. Pendiente de activación por administrador.');
          } else {
            throw new Error(response.error?.message || 'Error en el registro');
          }
        } catch (error: any) {
          set({ loading: false });
          const message = error.response?.data?.error?.message || error.message || 'Error en el registro';
          toast.error(message);
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('fros_token');
        localStorage.removeItem('fros_user');

        set({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false,
        });

        toast.success('Sesión cerrada exitosamente');
      },

      updateProfile: async (data: Partial<Usuario>) => {
        try {
          set({ loading: true });

          const response = await apiService.updateProfile(data);

          if (response.success && response.data) {
            const updatedUser = response.data.usuario;

            localStorage.setItem('fros_user', JSON.stringify(updatedUser));

            set({
              user: updatedUser,
              loading: false,
            });

            toast.success('Perfil actualizado exitosamente');
          } else {
            throw new Error(response.error?.message || 'Error actualizando perfil');
          }
        } catch (error: any) {
          set({ loading: false });
          const message = error.response?.data?.error?.message || error.message || 'Error actualizando perfil';
          toast.error(message);
          throw error;
        }
      },

      changePassword: async (currentPassword: string, newPassword: string) => {
        try {
          set({ loading: true });

          const response = await apiService.changePassword(currentPassword, newPassword);

          if (response.success) {
            set({ loading: false });
            toast.success('Contraseña actualizada exitosamente');
          } else {
            throw new Error(response.error?.message || 'Error cambiando contraseña');
          }
        } catch (error: any) {
          set({ loading: false });
          const message = error.response?.data?.error?.message || error.message || 'Error cambiando contraseña';
          toast.error(message);
          throw error;
        }
      },

      checkAuth: async () => {
        try {
          const token = localStorage.getItem('fros_token');
          const userStr = localStorage.getItem('fros_user');

          if (!token || !userStr) {
            set({
              isAuthenticated: false,
              user: null,
              token: null,
              loading: false,
            });
            return;
          }

          set({ loading: true });

          // Verificar que el token siga siendo válido
          const response = await apiService.getProfile();

          if (response.success && response.data) {
            const user = JSON.parse(userStr);

            set({
              isAuthenticated: true,
              user,
              token,
              loading: false,
            });
          } else {
            // Token inválido, limpiar
            localStorage.removeItem('fros_token');
            localStorage.removeItem('fros_user');

            set({
              isAuthenticated: false,
              user: null,
              token: null,
              loading: false,
            });
          }
        } catch (error) {
          // Error verificando token, limpiar
          localStorage.removeItem('fros_token');
          localStorage.removeItem('fros_user');

          set({
            isAuthenticated: false,
            user: null,
            token: null,
            loading: false,
          });
        }
      },
    }),
    {
      name: 'fros-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
);