# Configuracion de Supabase y Panel de Administracion

## Paso 1: Crear Proyecto en Supabase

1. Ir a https://supabase.com y crear una cuenta (es gratis)
2. Click en "New Project"
3. Elegir un nombre para el proyecto (ej: "tigo-viajes")
4. Crear una contrasena segura para la base de datos
5. Seleccionar la region mas cercana (ej: South America - Sao Paulo)
6. Esperar a que se cree el proyecto (1-2 minutos)

---

## Paso 2: Obtener Credenciales

1. En el dashboard de Supabase, ir a **Settings** (icono de engranaje)
2. Click en **API** en el menu lateral
3. Copiar los siguientes valores:
   - `Project URL` → sera tu `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → sera tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → sera tu `SUPABASE_SERVICE_ROLE_KEY`

---

## Paso 3: Configurar Variables de Entorno

1. Crear archivo `.env.local` en la raiz del proyecto (copiar de `.env.local.example`)
2. Pegar las credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

---

## Paso 4: Crear las Tablas en la Base de Datos

1. En Supabase, ir a **SQL Editor** (icono de base de datos)
2. Click en "New Query"
3. Abrir el archivo `supabase/migrations/001_create_tables.sql`
4. Copiar TODO el contenido y pegarlo en el SQL Editor
5. Click en "Run" (o Ctrl+Enter)
6. Verificar que diga "Success. No rows returned"

---

## Paso 5: Configurar Storage para Imagenes

1. En SQL Editor, crear una nueva query
2. Abrir el archivo `supabase/migrations/002_storage.sql`
3. Copiar TODO el contenido y pegarlo
4. Click en "Run"
5. Verificar en **Storage** que se crearon los buckets:
   - `packages` - Para imagenes de paquetes
   - `sections` - Para imagenes de secciones
   - `destinations` - Para imagenes de destinos

> **Nota**: Los buckets son publicos para lectura. Solo usuarios autenticados pueden subir imagenes desde el panel admin.

---

## Paso 6: Cargar los Datos Iniciales

1. En SQL Editor, crear una nueva query
2. Abrir el archivo `supabase/seed.sql`
3. Copiar TODO el contenido y pegarlo
4. Click en "Run"
5. Verificar que se crearon los datos en **Table Editor**

---

## Paso 7: Crear Usuario Administrador

1. En Supabase, ir a **Authentication** → **Users**
2. Click en "Add User" → "Create new user"
3. Completar:
   - Email: tu email (ej: admin@tigoviajes.com)
   - Password: una contrasena segura
   - Marcar "Auto Confirm User"
4. Click en "Create User"

---

## Paso 8: Probar el Panel de Administracion

1. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

2. Ir a http://localhost:3000/admin

3. Iniciar sesion con el email y contrasena del paso anterior

4. Ya podes gestionar:
   - **Paquetes**: crear, editar, duplicar, activar/desactivar
   - **Secciones Especiales**: crear secciones como "Verano 2026", "Semana Santa"
   - **Destinos**: agregar nuevos destinos

---

## Estructura del Panel Admin

```
/admin                → Dashboard con estadisticas
/admin/paquetes       → Lista de todos los paquetes
/admin/paquetes/nuevo → Crear nuevo paquete
/admin/paquetes/[id]  → Editar paquete existente
/admin/secciones      → Lista de secciones especiales
/admin/secciones/nueva→ Crear nueva seccion
/admin/secciones/[id] → Editar seccion existente
/admin/destinos       → Gestionar destinos
```

---

## Funcionalidades del Admin

### Paquetes
- Nombre, descripcion corta y larga
- Destino y duracion (dias/noches)
- Precio base y moneda (ARS/USD)
- Imagen principal (subir archivo o arrastrar)
- Servicios incluidos (lista editable)
- Servicios NO incluidos (lista editable)
- Excursiones opcionales (lista editable)
- Fechas de salida con precios individuales
- Flags: Activo, Destacado, Grupal, Especial

### Secciones Especiales
- Titulo y subtitulo
- Texto del badge (ej: "Ofertas Especiales")
- Imagen de fondo (subir archivo o arrastrar)
- Banner promocional (titulo + descripcion)
- Hasta 4 features con icono, titulo y descripcion
- Asignar paquetes a la seccion

### Destinos
- Nombre y slug
- Imagen representativa
- Orden de visualizacion

---

## Notas Importantes

- **Sin Supabase**: El sitio funciona con datos mock si no configuras Supabase
- **Imagenes**: Podes subir imagenes directamente desde el admin (JPG, PNG, WebP - max 5MB)
- **Storage**: Las imagenes se guardan en Supabase Storage con acceso publico
- **Iconos**: Los features usan iconos de Lucide React (Sun, Umbrella, Waves, Bus, Users, etc.)
- **Precios**: Se muestran como string para flexibilidad (ej: "USD 1.200", "ARS 450.000")

---

## Troubleshooting

### "Invalid API key"
- Verificar que las credenciales en `.env.local` sean correctas
- Reiniciar el servidor de desarrollo

### "No puedo iniciar sesion en /admin"
- Verificar que el usuario fue creado en Supabase Auth
- Verificar que marcaste "Auto Confirm User"

### "No se cargan los datos"
- Verificar que ejecutaste el seed.sql
- Revisar la consola del navegador por errores

### "Error al crear paquete"
- Verificar que ejecutaste el script de tablas completo
- Revisar que todas las tablas existan en Table Editor

---

## Contacto

Si tenes problemas con la configuracion, revisa:
1. La documentacion de Supabase: https://supabase.com/docs
2. Los logs en la consola del navegador (F12)
3. Los logs del servidor en la terminal
