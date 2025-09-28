import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

// Páginas
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import EspaciosPage from '@/pages/EspaciosPage';
import ReservasPage from '@/pages/ReservasPage';
import PagosPage from '@/pages/PagosPage';
import ProfilePage from '@/pages/ProfilePage';
import AdminUsersPage from '@/pages/admin/UsersPage';
import AdminConfigPage from '@/pages/admin/ConfigPage';
import AdminReportsPage from '@/pages/admin/ReportsPage';

// Componentes
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingSpinner from '@/components/LoadingSpinner';

function App() {
  const { isAuthenticated, loading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <div className=\"min-h-screen flex items-center justify-center bg-gray-50\">
        <LoadingSpinner size=\"lg\" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route
        path=\"/login\"
        element={
          isAuthenticated ? <Navigate to=\"/dashboard\" replace /> : <LoginPage />
        }
      />
      <Route
        path=\"/register\"
        element={
          isAuthenticated ? <Navigate to=\"/dashboard\" replace /> : <RegisterPage />
        }
      />

      {/* Rutas protegidas */}
      <Route
        path=\"/\"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Redirect root a dashboard */}
        <Route index element={<Navigate to=\"/dashboard\" replace />} />

        {/* Dashboard principal */}
        <Route path=\"dashboard\" element={<DashboardPage />} />

        {/* Gestión de espacios */}
        <Route path=\"espacios\" element={<EspaciosPage />} />

        {/* Gestión de reservas */}
        <Route path=\"reservas\" element={<ReservasPage />} />

        {/* Gestión de pagos */}
        <Route path=\"pagos\" element={<PagosPage />} />

        {/* Perfil de usuario */}
        <Route path=\"profile\" element={<ProfilePage />} />

        {/* Rutas administrativas */}
        <Route
          path=\"admin/users\"
          element={
            <ProtectedRoute requiredRoles={['ADMIN', 'OPERADOR']}>
              <AdminUsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path=\"admin/config\"
          element={
            <ProtectedRoute requiredRoles={['ADMIN']}>
              <AdminConfigPage />
            </ProtectedRoute>
          }
        />
        <Route
          path=\"admin/reports\"
          element={
            <ProtectedRoute requiredRoles={['ADMIN', 'OPERADOR']}>
              <AdminReportsPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Ruta 404 */}
      <Route path=\"*\" element={<Navigate to=\"/dashboard\" replace />} />
    </Routes>
  );
}

export default App;