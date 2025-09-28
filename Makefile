# Makefile para el proyecto FROS

.PHONY: help install dev build start stop clean logs migrate seed

# Mostrar ayuda
help:
	@echo "Comandos disponibles:"
	@echo "  make install    - Instalar todas las dependencias"
	@echo "  make dev        - Iniciar en modo desarrollo"
	@echo "  make build      - Construir imágenes Docker"
	@echo "  make start      - Iniciar servicios"
	@echo "  make stop       - Detener servicios"
	@echo "  make clean      - Limpiar contenedores y volúmenes"
	@echo "  make logs       - Mostrar logs"
	@echo "  make migrate    - Ejecutar migraciones de base de datos"
	@echo "  make seed       - Ejecutar seed de datos iniciales"

# Instalar dependencias
install:
	@echo "📦 Instalando dependencias..."
	cd backend && npm install
	cd frontend && npm install
	@echo "✅ Dependencias instaladas"

# Desarrollo
dev:
	@echo "🚀 Iniciando en modo desarrollo..."
	docker-compose up --build

# Construir imágenes
build:
	@echo "🔨 Construyendo imágenes Docker..."
	docker-compose build

# Iniciar servicios
start:
	@echo "▶️ Iniciando servicios..."
	docker-compose up -d

# Detener servicios
stop:
	@echo "⏹️ Deteniendo servicios..."
	docker-compose down

# Limpiar todo
clean:
	@echo "🧹 Limpiando contenedores y volúmenes..."
	docker-compose down -v --remove-orphans
	docker system prune -f

# Mostrar logs
logs:
	docker-compose logs -f

# Migraciones
migrate:
	@echo "🗃️ Ejecutando migraciones..."
	docker-compose exec backend npx prisma migrate dev

# Seed de datos
seed:
	@echo "🌱 Insertando datos iniciales..."
	docker-compose exec backend npx prisma db seed

# Resetear base de datos
reset-db:
	@echo "🔄 Reseteando base de datos..."
	docker-compose exec backend npx prisma migrate reset --force

# Abrir shell en backend
shell-backend:
	docker-compose exec backend sh

# Abrir shell en frontend
shell-frontend:
	docker-compose exec frontend sh

# Ver estado de servicios
status:
	docker-compose ps