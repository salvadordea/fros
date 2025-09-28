import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { RolUsuario } from '@/types';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: RolUsuario[];
}

const ProtectedRoute = ({ children, requiredRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to=\"/login\" replace />;
  }

  // Verificar roles si se especifican
  if (requiredRoles && user) {
    const hasRequiredRole = requiredRoles.includes(user.rol);

    if (!hasRequiredRole) {
      return <Navigate to=\"/dashboard\" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;