# ⚡ DEPLOY RÁPIDO - 12 MINUTOS

## 🎯 Para tu reunión de mañana

### ✅ PASO 1: Deploy Backend (5 min)
1. [ ] Ve a [railway.app](https://railway.app) → Login con GitHub
2. [ ] New Project → Deploy from GitHub → Selecciona `salvadordea/fros`
3. [ ] Click "+ New" → Database → PostgreSQL
4. [ ] Click en el servicio backend → Settings:
   - Root Directory: `backend`
   - Build Command: `npm install && npx prisma generate && npm run build`
   - Start Command: `npx prisma migrate deploy && npx prisma db seed && npm start`
5. [ ] Variables → Copia y pega:
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   JWT_SECRET=demo_secret_change_in_production_2024
   JWT_EXPIRES_IN=7d
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=https://placeholder.vercel.app
   DEFAULT_SPACES_COUNT=100
   DEFAULT_TEMP_MIN=-18.0
   DEFAULT_TEMP_MAX=-15.0
   ```
6. [ ] Deploy → **COPIA LA URL que te da** (ej: https://xxx.up.railway.app)

---

### ✅ PASO 2: Deploy Frontend (3 min)
1. [ ] Ve a [vercel.com](https://vercel.com) → Login con GitHub
2. [ ] Add New Project → Importa `salvadordea/fros`
3. [ ] Configuración:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`
4. [ ] Environment Variables:
   ```
   VITE_API_URL=https://TU-URL-DE-RAILWAY.up.railway.app/api
   ```
   ⚠️ **IMPORTANTE:** Pega la URL que copiaste en Paso 1.6
5. [ ] Deploy → **COPIA LA URL de Vercel** (ej: https://fros-xxx.vercel.app)

---

### ✅ PASO 3: Conectar Frontend con Backend (2 min)
1. [ ] Regresa a Railway → Backend → Variables
2. [ ] Actualiza `FRONTEND_URL` con tu URL de Vercel:
   ```
   FRONTEND_URL=https://TU-URL-DE-VERCEL.vercel.app
   ADMIN_URL=https://TU-URL-DE-VERCEL.vercel.app/admin
   ```
3. [ ] El backend se redesplegará automáticamente (espera 1 min)

---

### ✅ PASO 4: Verificar (2 min)
1. [ ] Abre tu URL de Vercel en el navegador
2. [ ] Deberías ver el login de FROS
3. [ ] Prueba login con:
   - **Email:** admin@fros.com
   - **Password:** Admin123!
4. [ ] Si funciona, ¡LISTO! 🎉

---

## 📱 URL para compartir con clientes:
```
https://tu-app.vercel.app
```

---

## 🆘 Si algo falla:

### Frontend no carga
- Revisa logs en Vercel → Deployments → Logs
- Verifica que el build terminó exitosamente

### Error al hacer login
- Revisa logs en Railway → Backend → Logs
- Busca "Seed completed" para confirmar que los usuarios de prueba se crearon
- Si no existe, ve a Railway → Backend → Settings → Manual Redeploy

### Error "Cannot connect to server"
- Verifica que `VITE_API_URL` en Vercel tenga la URL correcta de Railway
- Asegúrate de que Railway backend esté "running" (check en Railway dashboard)
- Espera 1-2 min después de deploy para que todo inicie

---

## 🎨 Tips para la presentación:

### Credenciales de demo:
```
Admin:
  - Email: admin@fros.com
  - Password: Admin123!
  - Puede ver TODO

Operador:
  - Email: operador@fros.com
  - Password: Operator123!
  - Gestión de espacios y reservas

Cliente:
  - Email: cliente1@example.com
  - Password: Cliente123!
  - Vista de cliente, crear reservas
```

### Características para mostrar:
1. ✨ **Login seguro** - Sistema de roles
2. 🏢 **Grid de espacios** - Visualización de 100 espacios
3. 📋 **Reservas** - Sistema de pre-reservas
4. 👥 **Usuarios** - Gestión completa de usuarios
5. 📊 **Dashboard** - Métricas en tiempo real
6. 💰 **Facturación** - Cotizaciones automáticas
7. 📱 **Responsive** - Funciona en móvil y desktop

### Flujo recomendado para demo:
1. Login como Admin
2. Mostrar dashboard con estadísticas
3. Ir al grid de espacios (visual impresionante)
4. Crear una reserva de prueba
5. Mostrar gestión de usuarios
6. Logout y login como Cliente
7. Mostrar vista de cliente (más limitada)

---

## ⏰ Tiempo total: ~12 minutos

**¿Todo listo?** Guarda las URLs y credenciales para mañana! 🚀
