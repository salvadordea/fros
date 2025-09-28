const PagosPage = () => {
  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            Gestión de Pagos
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Control y administración de pagos y facturación
          </p>
        </div>
      </div>

      <div className="card">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center py-12 text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="mt-2 text-sm text-gray-500">
              Página en construcción
              <br />
              La funcionalidad de pagos se implementará próximamente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagosPage;