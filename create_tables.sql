-- Create enums
CREATE TYPE "RolUsuario" AS ENUM ('ADMIN', 'OPERADOR', 'CLIENTE');
CREATE TYPE "EstadoUsuario" AS ENUM ('ACTIVO', 'INACTIVO', 'PENDIENTE', 'SUSPENDIDO');
CREATE TYPE "EstadoEspacio" AS ENUM ('LIBRE', 'OCUPADO', 'RESERVADO', 'MANTENIMIENTO');

-- Create usuarios table
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT,
    "rol" "RolUsuario" NOT NULL DEFAULT 'CLIENTE',
    "estado" "EstadoUsuario" NOT NULL DEFAULT 'PENDIENTE',
    "password" TEXT NOT NULL,
    "invitadoPor" TEXT,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- Create espacios table
CREATE TABLE "espacios" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "estado" "EstadoEspacio" NOT NULL DEFAULT 'LIBRE',
    "temperaturaMin" DOUBLE PRECISION DEFAULT -18.0,
    "temperaturaMax" DOUBLE PRECISION DEFAULT -15.0,
    "notas" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "espacios_pkey" PRIMARY KEY ("id")
);

-- Create unique constraints
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
CREATE UNIQUE INDEX "espacios_numero_key" ON "espacios"("numero");

-- Add foreign key constraint
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_invitadoPor_fkey" FOREIGN KEY ("invitadoPor") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;