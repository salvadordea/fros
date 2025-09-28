const EspaciosPage = () => {
  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            Gestión de Espacios
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Control visual y gestión de los 100 espacios de la bodega
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button className="btn-primary">
            Actualizar Estado
          </button>
        </div>
      </div>

      {/* Grid de espacios */}
      <div className="card">
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-medium text-gray-900 mb-2 sm:mb-0">
              Estado Actual de Espacios
            </h3>
            
            {/* Filtros */}
            <div className="flex space-x-2">
              <select className="input-field text-sm w-auto">
                <option value="">Todos los estados</option>
                <option value="LIBRE">Libre</option>
                <option value="RESERVADO">Reservado</option>
                <option value="OCUPADO">Ocupado</option>
                <option value="MANTENIMIENTO">Mantenimiento</option>
              </select>
            </div>
          </div>

          {/* Estadísticas rápidas */}
          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success-600">85</div>
              <div className="text-sm text-gray-500">Libres</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning-600">8</div>
              <div className="text-sm text-gray-500">Reservados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-danger-600">5</div>
              <div className="text-sm text-gray-500">Ocupados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">2</div>
              <div className="text-sm text-gray-500">Mantenimiento</div>
            </div>
          </div>

          {/* Grid de espacios */}
          <div className="grid grid-cols-10 gap-2">
            {Array.from({ length: 100 }, (_, i) => {
              const num = i + 1;
              // Simulamos algunos estados para demostración
              let stateClass = 'space-libre';
              if ([3, 15, 27, 41, 68].includes(num)) stateClass = 'space-ocupado';
              if ([5, 12, 23, 34, 45, 56, 67, 78].includes(num)) stateClass = 'space-reservado';
              if ([88, 99].includes(num)) stateClass = 'space-mantenimiento';
              
              return (
                <div
                  key={num}
                  className={`space-item ${stateClass}`}
                  title={`Espacio ${num.toString().padStart(3, '0')}`}
                >
                  {num.toString().padStart(3, '0')}
                </div>
              );
            })}
          </div>
          
          {/* Leyenda */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-success-200 border border-success-300 rounded mr-2"></div>
              <span>Libre (85)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-warning-200 border border-warning-300 rounded mr-2"></div>
              <span>Reservado (8)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-danger-200 border border-danger-300 rounded mr-2"></div>
              <span>Ocupado (5)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded mr-2"></div>
              <span>Mantenimiento (2)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de espacios con detalles */}
      <div className="card">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Espacios con Actividad
          </h3>
          
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Espacio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Inicio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Fin</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Simulamos algunos datos */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">003</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge-danger">Ocupado</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Juan Pérez</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-15</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-02-15</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-900">Ver detalles</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">015</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge-danger">Ocupado</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">María García</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-10</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-03-10</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-900">Ver detalles</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">023</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge-warning">Reservado</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Carlos López</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-02-01</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-04-01</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-900">Aprobar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EspaciosPage;