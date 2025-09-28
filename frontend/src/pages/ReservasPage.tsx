const ReservasPage = () => {
  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            Gestión de Reservas
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Control y administración de reservas de espacios
          </p>
        </div>
      </div>

      <div className="card">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center py-12 text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="mt-2 text-sm text-gray-500">
              Página en construcción
              <br />
              La funcionalidad de reservas se implementará próximamente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservasPage;