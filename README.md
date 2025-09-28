# Sistema de Control de Bodega de Congelados (FROS)

Sistema web completo para gestionar el control de una bodega de congelados que funciona como sistema de reservas.

## 🚀 Inicio Rápido

### Con Docker (Recomendado)
```bash
git clone <repository-url>
cd fros
make dev
```

### Manual
```bash
# 1. Configurar backend
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma db seed

# 2. Configurar frontend
cd ../frontend
npm install

# 3. Iniciar desarrollo
npm run dev
```

**Acceso**: http://localhost:5173

**Credenciales de prueba**:
- **Admin**: admin@fros.com / Admin123!
- **Operador**: operador@fros.com / Operator123!
- **Cliente**: cliente1@example.com / Cliente123!

## ✨ Características Principales

### 🏢 Gestión de Espacios
- ✅ Sistema configurable de 100 espacios (modificable)
- ✅ Estados: Libre, Reservado, Ocupado, Mantenimiento
- ✅ Grid visual interactivo con código de colores
- ✅ Historial completo por espacio
- ✅ Control de temperatura personalizado

### 👥 Sistema de Usuarios
- ✅ Registro por invitación únicamente
- ✅ Roles: Administrador, Operador, Cliente
- ✅ Autenticación JWT segura
- ✅ Gestión de perfiles y permisos

### 📋 Sistema de Reservas
- ✅ Pre-reservas con autorización administrativa
- ✅ Motor de búsqueda inteligente
- ✅ Asignación automática de espacios contiguos
- ✅ Códigos QR para acceso físico
- ✅ Notificaciones por email

### 💰 Sistema de Facturación
- ✅ Tarifas configurables por día/semana/mes
- ✅ Descuentos por volumen y tiempo
- ✅ Generación automática de cotizaciones
- ✅ Control de pagos y estados de cuenta

### 📊 Dashboard y Reportes
- ✅ Métricas en tiempo real
- ✅ Reportes de ocupación e ingresos
- ✅ Análisis de clientes
- ✅ Exportación PDF/Excel

### 🔧 Funcionalidades Adicionales
- ✅ Gestión de inventario del cliente
- ✅ Sistema de mantenimiento preventivo
- ✅ Control de acceso físico
- ✅ Logs de auditoría
- ✅ Configuración flexible

## 🛠 Stack Tecnológico

### Backend
- **Node.js** + **Express** + **TypeScript**
- **PostgreSQL** + **Prisma ORM**
- **JWT** para autenticación
- **Nodemailer** para emails
- **Joi** para validaciones

### Frontend
- **React 18** + **TypeScript**
- **Vite** para build rápido
- **Tailwind CSS** + **Headless UI**
- **Zustand** para estado global
- **React Query** para cache de datos
- **React Router** para navegación

### DevOps
- **Docker** + **Docker Compose**
- **PostgreSQL 15**
- **Adminer** para gestión DB
- **ESLint** + **Prettier**

## 📁 Estructura del Proyecto

```
fros/
├── 📁 backend/              # API REST con Node.js
│   ├── 📁 src/
│   │   ├── 📁 controllers/  # Controladores de rutas
│   │   ├── 📁 middleware/   # Middleware de auth/validación
│   │   ├── 📁 routes/       # Definición de rutas API
│   │   ├── 📁 services/     # Lógica de negocio
│   │   ├── 📁 utils/        # Utilidades y helpers
│   │   └── 📁 types/        # Tipos TypeScript
│   ├── 📁 prisma/           # Schema y migraciones DB
│   ├── 🐳 Dockerfile.dev    # Docker para desarrollo
│   └── 📦 package.json
├── 📁 frontend/             # Aplicación React
│   ├── 📁 src/
│   │   ├── 📁 components/   # Componentes reutilizables
│   │   ├── 📁 pages/        # Páginas principales
│   │   ├── 📁 services/     # Llamadas a API
│   │   ├── 📁 store/        # Estado global (Zustand)
│   │   ├── 📁 types/        # Tipos TypeScript
│   │   └── 📁 utils/        # Utilidades frontend
│   ├── 🐳 Dockerfile.dev    # Docker para desarrollo
│   └── 📦 package.json
├── 📁 shared/               # Tipos compartidos
├── 🐳 docker-compose.yml    # Configuración Docker completa
├── 📜 Makefile              # Scripts de desarrollo
├── 📋 DEVELOPMENT.md        # Guía de desarrollo
└── 📖 README.md
```

## 🔧 Comandos Útiles

```bash
# Desarrollo
make dev              # Iniciar todos los servicios
make logs             # Ver logs en tiempo real
make stop             # Detener servicios

# Base de datos
make migrate          # Ejecutar migraciones
make seed             # Insertar datos de prueba
make reset-db         # Resetear base de datos

# Utilidades
make clean            # Limpiar Docker
make status           # Ver estado de servicios
make help             # Ver todos los comandos
```

## 🌐 Acceso a Servicios

| Servicio | URL | Descripción |
|----------|-----|-------------|
| 🖥 Frontend | http://localhost:5173 | Aplicación principal |
| 🔌 Backend API | http://localhost:3001 | API REST |
| 🗄 Adminer | http://localhost:8080 | Gestión de base de datos |
| 📊 Prisma Studio | http://localhost:5555 | ORM visual |

## 📋 Funcionalidades Implementadas

### ✅ Fase 1: Base del Sistema
- [x] Estructura completa del proyecto
- [x] Configuración Docker y scripts
- [x] Base de datos con Prisma
- [x] Sistema de autenticación JWT
- [x] Frontend base con React + TypeScript

### 🚧 Fase 2: Funcionalidades Core
- [ ] APIs completas para espacios
- [ ] Sistema de reservas funcional
- [ ] Panel visual administrativo
- [ ] Motor de búsqueda inteligente

### 📅 Fase 3: Funcionalidades Avanzadas
- [ ] Sistema de facturación completo
- [ ] Notificaciones por email
- [ ] Dashboard con reportes
- [ ] Control de acceso físico

## 🎯 Roadmap

### Sprint 1 (Semana 1)
- [x] ✅ Configuración inicial y autenticación
- [ ] 🔄 APIs de gestión de espacios
- [ ] 🔄 Sistema básico de reservas

### Sprint 2 (Semana 2)
- [ ] 📋 Panel visual administrativo
- [ ] 🔍 Motor de búsqueda
- [ ] 💰 Sistema de facturación

### Sprint 3 (Semana 3)
- [ ] 📊 Dashboard y reportes
- [ ] 📧 Sistema de notificaciones
- [ ] 🔧 Funcionalidades adicionales

## 🤝 Contribuir

1. Fork el repositorio
2. Crear rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -am 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

## 📖 Documentación

- [🔧 Guía de Desarrollo](./DEVELOPMENT.md)
- [🚀 Guía de Deployment](./DEPLOYMENT.md)
- [📚 Documentación API](./API.md)

## 📄 Licencia

MIT License - Ver [LICENSE](./LICENSE) para más detalles.

## 💬 Soporte

- 📧 Email: soporte@fros.com
- 🐛 Issues: [GitHub Issues](./issues)
- 📖 Wiki: [Documentación completa](./wiki)