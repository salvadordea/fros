const UsersPage = () => {
  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            Gestión de Usuarios
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Administración de usuarios del sistema
          </p>
        </div>
      </div>

      <div className="card">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center py-12 text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <p className="mt-2 text-sm text-gray-500">
              Página en construcción
              <br />
              La gestión de usuarios se implementará próximamente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;