# Guía de Desarrollo - FROS

## Configuración Inicial

### Prerrequisitos
- Docker y Docker Compose
- Node.js 18+ (para desarrollo local)
- PostgreSQL 15+ (si no usas Docker)

### Instalación Rápida con Docker

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd fros
   ```

2. **Configurar variables de entorno**
   ```bash
   cp backend/.env.example backend/.env
   # Editar backend/.env con tus configuraciones
   ```

3. **Iniciar todos los servicios**
   ```bash
   make dev
   # o alternativamente: docker-compose up --build
   ```

4. **Ejecutar migraciones y seed**
   ```bash
   make migrate
   make seed
   ```

5. **Acceder a la aplicación**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Adminer (DB): http://localhost:8080

### Instalación Local (sin Docker)

1. **Base de datos PostgreSQL**
   ```bash
   # Crear base de datos
   createdb fros_db
   ```

2. **Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configurar DATABASE_URL en .env
   npx prisma migrate dev
   npx prisma db seed
   npm run dev
   ```

3. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Comandos Útiles

### Con Makefile
```bash
make help          # Ver todos los comandos disponibles
make dev           # Desarrollo con Docker
make migrate       # Ejecutar migraciones
make seed          # Insertar datos de prueba
make logs          # Ver logs de servicios
make clean         # Limpiar todo
```

### Docker Compose
```bash
docker-compose up --build    # Iniciar con rebuild
docker-compose down         # Detener servicios
docker-compose logs -f      # Ver logs en tiempo real
```

### Base de Datos
```bash
# Ejecutar migraciones
npx prisma migrate dev

# Resetear base de datos
npx prisma migrate reset

# Abrir Prisma Studio
npx prisma studio

# Generar cliente Prisma
npx prisma generate
```

## Estructura del Proyecto

```
fros/
├── backend/                 # API REST con Node.js
│   ├── src/
│   │   ├── controllers/     # Controladores
│   │   ├── middleware/      # Middleware
│   │   ├── routes/          # Rutas
│   │   ├── services/        # Lógica de negocio
│   │   └── utils/           # Utilidades
│   ├── prisma/              # Schema y migraciones
│   └── Dockerfile.dev       # Docker para desarrollo
├── frontend/                # App React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas
│   │   ├── services/        # API calls
│   │   ├── store/           # Estado global
│   │   └── types/           # Tipos TypeScript
│   └── Dockerfile.dev       # Docker para desarrollo
├── shared/                  # Tipos compartidos
├── docker-compose.yml       # Configuración Docker
└── Makefile                # Scripts de desarrollo
```

## Credenciales de Desarrollo

### Usuarios de Prueba
- **Administrador**: admin@fros.com / Admin123!
- **Operador**: operador@fros.com / Operator123!
- **Cliente**: cliente1@example.com / Cliente123!

### Base de Datos
- Host: localhost:5432
- Database: fros_db
- User: fros_user
- Password: fros_password

## Desarrollo

### Backend
- Puerto: 3001
- Hot reload automático con nodemon
- Logs de desarrollo habilitados
- Prisma Studio: http://localhost:5555

### Frontend
- Puerto: 5173
- Hot reload con Vite
- Proxy automático a /api -> localhost:3001

### Base de Datos
- Puerto: 5432
- Adminer web UI: http://localhost:8080

## Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## Lint y Formato

```bash
# Backend
cd backend && npm run lint
cd backend && npm run lint:fix

# Frontend
cd frontend && npm run lint
cd frontend && npm run lint:fix
```

## Troubleshooting

### Error de conexión a la base de datos
1. Verificar que PostgreSQL esté ejecutándose
2. Comprobar variables de entorno en .env
3. Ejecutar migraciones: `make migrate`

### Puerto ocupado
```bash
# Verificar qué proceso usa el puerto
lsof -i :3001  # Backend
lsof -i :5173  # Frontend
lsof -i :5432  # PostgreSQL
```

### Limpiar Docker
```bash
make clean
docker system prune -a
```

### Reiniciar base de datos
```bash
make reset-db
make seed
```

## Deployment

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones de producción.

## Contribuciones

1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -am 'Agregar nueva funcionalidad'`
4. Push rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request