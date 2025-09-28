-- Script de inicialización para PostgreSQL
-- Este archivo se ejecuta automáticamente cuando se crea el contenedor

-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear base de datos si no existe
-- (PostgreSQL en Docker ya crea la base especificada en POSTGRES_DB)