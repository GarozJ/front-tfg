# 🚀 QUICK START - Frontend CRUD

## Paso 1: Instalar dependencias
```powershell
cd C:\Users\Marco\Desktop\workspace-intellij\proyecto\frontend
npm install
```

## Paso 2: Verificar que el backend está corriendo
Asegúrate que el backend Spring corre en: **http://localhost:8080**

Si corre en otra URL, edita `.env`:
```env
REACT_APP_API_BASE_URL=http://tu-backend:puerto
```

## Paso 3: Arrancar el frontend
```powershell
npm start
```

Se abrirá automáticamente en **http://localhost:3000**

---

## Características

✅ **CRUD Completo** para 5 recursos  
✅ **Crear** - Botón "+ Nuevo [Recurso]"  
✅ **Leer** - Tabla con todos los registros  
✅ **Actualizar** - Botón "Editar" en cada fila  
✅ **Eliminar** - Botón "Eliminar" con confirmación  

---

## Estructura de navegación

```
Usuarios      → Crear, editar, eliminar usuarios
Libros        → Crear, editar, eliminar libros
Reservas      → Crear, editar, eliminar reservas
Préstamos     → Crear, editar, eliminar préstamos
Roles         → Crear, editar, eliminar roles
```

---

## Solución rápida de problemas

| Problema | Solución |
|----------|----------|
| **"Cannot connect to backend"** | Verificar que backend corre en http://localhost:8080 |
| **"CORS error"** | Añadir `@CrossOrigin` en controladores Spring o configurar CORS global |
| **"Tabla vacía"** | Abrir DevTools (F12) → Console, buscar errores HTTP |
| **"npm ERR! Cannot find module"** | Borrar `node_modules` y correr `npm install` nuevamente |
| **"Port 3000 already in use"** | Cambiar puerto: `PORT=3001 npm start` |

---

## API Endpoints (llamadas automáticas desde el frontend)

Todas estas llamadas se hacen **automáticamente** cuando usas el CRUD:

```
GET  /usuario/all                      → Listar usuarios
GET  /usuario/byId/{id}                → Obtener usuario por ID
POST /usuario/create                   → Crear usuario
PUT  /usuario/update/{id}              → Editar usuario
DELETE /usuario/delete/{id}            → Eliminar usuario

(Lo mismo para /libro, /reserva, /prestamo)

GET  /rol/all                          → Listar roles
GET  /rol/findById/{id}                → Obtener rol por ID
POST /rol/create/{rolName}             → Crear rol (URL param)
PUT  /rol/update/{id}                  → Editar rol
DELETE /rol/delete/{id}                → Eliminar rol
```

---

## ¿Qué archivos usar?

| Archivo | Propósito |
|---------|-----------|
| `src/components/**/\*Crud.js` | **Usa estos** - Componentes con CRUD completo |
| `src/components/**/\*List.js` | (Obsoleto) - Solo lectura |
| `src/api/apiClient.js` | Cliente HTTP (Axios) con base URL configurable |
| `.env` | Variables de entorno (URL del backend) |

---

## Estructura de carpetas

```
frontend/
├── node_modules/          (creado por npm install)
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── CollectionView.js   ← Tabla reutilizable
│   │   │   ├── FormComponent.js     ← Formulario reutilizable
│   │   │   └── TableActions.js      ← Botones Editar/Eliminar
│   │   ├── usuario/UsuarioCrud.js   ← CRUD usuarios
│   │   ├── libro/LibroCrud.js       ← CRUD libros
│   │   ├── reserva/ReservaCrud.js   ← CRUD reservas
│   │   ├── prestamo/PrestamoCrud.js ← CRUD préstamos
│   │   └── rol/RolCrud.js           ← CRUD roles
│   ├── api/
│   │   └── apiClient.js             ← Cliente HTTP
│   ├── App.js                       ← Rutas principales
│   ├── index.js                     ← Punto de entrada
│   └── index.css                    ← Estilos
├── .env                             ← Variables de entorno
├── package.json                     ← Dependencias
└── README.md                        ← Documentación completa
```

---

## Notas importantes

1. **El frontend llama automáticamente al backend** - No necesitas hacer nada extra, solo asegúrate que el backend esté corriendo.

2. **Los DTOs deben coincidir** - Los campos del formulario (nombre, email, etc.) deben coincidir con los nombres de propiedades en tus DTOs Spring.

3. **Errores en la tabla** - Si ves errores, abre DevTools (F12) y revisa la pestaña "Network" para ver qué devuelve el backend.

4. **Editar pre-llena el formulario** - Cuando haces clic en "Editar", abre el formulario vacío (necesitarías mejorar esto cargando los datos previos desde la API si lo necesitas).

---

## ¿Listo?

```powershell
cd C:\Users\Marco\Desktop\workspace-intellij\proyecto-juanolas\frontend
npm install
npm start
```

¡El frontend abrirá en http://localhost:3000! 🎉

