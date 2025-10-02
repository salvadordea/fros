# 🚀 Guía de Deployment para FROS

Esta guía te ayudará a desplegar FROS en la nube en menos de 15 minutos.

## 📋 Prerrequisitos

1. ✅ Cuenta en [Railway](https://railway.app) (gratis)
2. ✅ Cuenta en [Vercel](https://vercel.com) (gratis)
3. ✅ Código en GitHub (ya lo tienes)

---

## 🔧 Paso 1: Deploy del Backend en Railway

### 1.1 Crear proyecto en Railway

1. Ve a [railway.app](https://railway.app) y haz login con GitHub
2. Click en **"New Project"**
3. Selecciona **"Deploy from GitHub repo"**
4. Selecciona el repositorio **`salvadordea/fros`**

### 1.2 Agregar PostgreSQL

1. En tu proyecto Railway, click en **"+ New"**
2. Selecciona **"Database"** → **"PostgreSQL"**
3. Railway creará automáticamente la base de datos

### 1.3 Configurar el Backend Service

1. Click en el servicio del backend (fros)
2. Ve a la pestaña **"Settings"**
3. En **"Root Directory"** escribe: `backend`
4. En **"Build Command"** escribe: `npm install && npx prisma generate && npm run build`
5. En **"Start Command"** escribe: `npx prisma migrate deploy && npx prisma db seed && npm start`

### 1.4 Configurar Variables de Entorno

En la pestaña **"Variables"** del backend, agrega:

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=tu_super_secreto_jwt_cambiar_en_produccion_12345
JWT_EXPIRES_IN=7d
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://tu-app.vercel.app
ADMIN_URL=https://tu-app.vercel.app/admin

# Email (opcional por ahora)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-password
FROM_EMAIL=tu-email@gmail.com
FROM_NAME=Sistema FROS

# Configuración
DEFAULT_SPACES_COUNT=100
DEFAULT_TEMP_MIN=-18.0
DEFAULT_TEMP_MAX=-15.0
```

**IMPORTANTE:**
- `${{Postgres.DATABASE_URL}}` se conecta automáticamente a tu DB de Railway
- Cambia `JWT_SECRET` por algo único y seguro
- `FRONTEND_URL` lo actualizarás después de deploy en Vercel

### 1.5 Deploy!

1. Click en **"Deploy"**
2. Espera 2-3 minutos
3. Railway te dará una URL pública como: `https://fros-production.up.railway.app`
4. **COPIA ESTA URL** - la necesitarás para Vercel

---

## 🎨 Paso 2: Deploy del Frontend en Vercel

### 2.1 Crear proyecto en Vercel

1. Ve a [vercel.com](https://vercel.com) y haz login con GitHub
2. Click en **"Add New Project"**
3. Importa el repositorio **`salvadordea/fros`**

### 2.2 Configurar el proyecto

En la configuración del proyecto:

1. **Framework Preset:** Vite
2. **Root Directory:** `frontend`
3. **Build Command:** `npm install && npm run build`
4. **Output Directory:** `dist`

### 2.3 Variables de Entorno

En **"Environment Variables"** agrega:

```env
VITE_API_URL=https://fros-production.up.railway.app/api
```

**IMPORTANTE:** Reemplaza `fros-production.up.railway.app` con tu URL real de Railway del Paso 1.5

### 2.4 Deploy!

1. Click en **"Deploy"**
2. Espera 1-2 minutos
3. Vercel te dará una URL como: `https://fros-salvadordea.vercel.app`

---

## 🔄 Paso 3: Actualizar URLs

### 3.1 Actualizar Frontend URL en Railway

1. Regresa a Railway → Tu proyecto → Backend service
2. En Variables de entorno, actualiza:
   ```env
   FRONTEND_URL=https://fros-salvadordea.vercel.app
   ADMIN_URL=https://fros-salvadordea.vercel.app/admin
   ```
3. El servicio se redesplegará automáticamente

### 3.2 Configurar CORS (si es necesario)

El backend ya tiene CORS configurado para aceptar peticiones del frontend.

---

## ✅ Paso 4: Verificar el Deploy

1. Ve a tu URL de Vercel: `https://fros-salvadordea.vercel.app`
2. Deberías ver la pantalla de login
3. Usa las credenciales de prueba:
   - **Admin:** admin@fros.com / Admin123!
   - **Operador:** operador@fros.com / Operator123!
   - **Cliente:** cliente1@example.com / Cliente123!

---

## 🎯 URLs Finales

| Servicio | URL | Descripción |
|----------|-----|-------------|
| 🎨 Frontend | https://fros-salvadordea.vercel.app | Aplicación web |
| 🔌 API | https://fros-production.up.railway.app | Backend REST API |
| 🗄 Database | Railway interno | PostgreSQL (no expuesta) |

---

## 🔧 Comandos Útiles Post-Deploy

### Ver logs del backend
1. Ve a Railway → Tu proyecto → Backend
2. Click en la pestaña **"Logs"**

### Ejecutar migraciones manualmente
```bash
# En Railway, ve a Settings → Deploy Triggers → Manual Deploy
# O usa Railway CLI:
railway run npx prisma migrate deploy
```

### Reiniciar servicios
- **Railway:** Click en los 3 puntos → "Restart"
- **Vercel:** Push a GitHub o click en "Redeploy" en el dashboard

---

## 🚨 Troubleshooting

### El frontend no se conecta al backend
- ✅ Verifica que `VITE_API_URL` en Vercel apunte a la URL correcta de Railway
- ✅ Asegúrate de que Railway esté ejecutándose (check logs)
- ✅ Revisa la consola del navegador (F12) para errores de CORS

### Error 500 en el backend
- ✅ Revisa los logs en Railway
- ✅ Verifica que `DATABASE_URL` esté configurado correctamente
- ✅ Asegúrate de que las migraciones se ejecutaron (check logs de deploy)

### No puedo hacer login
- ✅ Verifica que el seed se ejecutó correctamente (check logs)
- ✅ Intenta ejecutar seed manualmente: `railway run npx prisma db seed`

---

## 🔄 Actualizaciones Automáticas

Ambos servicios están conectados a GitHub:

1. **Push a `main`** → Railway y Vercel se redesplegan automáticamente
2. **Ver progreso** en los dashboards respectivos
3. **Rollback** disponible en caso de errores

---

## 💰 Costos

### Railway (Tier Gratuito)
- ✅ $5 USD/mes de crédito gratis
- ✅ Suficiente para desarrollo y demos
- 📊 Para producción: ~$10-20/mes

### Vercel (Tier Gratuito)
- ✅ 100% gratis para proyectos personales
- ✅ Builds ilimitados
- ✅ Bandwidth generoso

---

## 📞 Soporte

Si algo no funciona:
1. Revisa los logs en Railway y Vercel
2. Verifica las variables de entorno
3. Contacta al equipo

---

## 🎉 ¡Listo!

Tu aplicación FROS ahora está disponible globalmente 24/7.

**URL para compartir con clientes:**
👉 https://fros-salvadordea.vercel.app

---

## 🔒 Seguridad para Producción

Antes de usar en producción real:

- [ ] Cambiar `JWT_SECRET` por uno único y fuerte
- [ ] Configurar email SMTP real para notificaciones
- [ ] Habilitar SSL/HTTPS (Railway y Vercel lo hacen automáticamente)
- [ ] Revisar y actualizar las credenciales de prueba
- [ ] Configurar backup de base de datos en Railway
- [ ] Agregar monitoreo (Railway tiene métricas incluidas)
