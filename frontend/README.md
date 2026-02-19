# Frontend React — CRUD completo para Proyecto

Frontend con CRUD funcional para consumir las APIs Spring del proyecto.

## Instrucciones de instalación y ejecución

### 1. Requisitos
- Node.js 16+ (v24.13.1+ recomendado)
- npm 8+ (v11.8.0 recomendado)

### 2. Instalar dependencias
Abrir terminal en `proyecto/frontend`:
```bash
npm install
```

### 3. Ejecutar la app
```bash
npm start
```

La app abrirá en http://localhost:3000

## Características

- ✅ **CRUD completo** para 5 recursos: Usuario, Libro, Reserva, Préstamo, Rol
- ✅ **Tabla interactiva** con datos en tiempo real
- ✅ **Formularios** para crear y editar registros
- ✅ **Botones Editar/Eliminar** en cada fila
- ✅ **UI responsive** y moderna con estilos mejorados
- ✅ **Navegación** sencilla entre recursos

## Estructura del frontend

```
src/
├── components/
│   ├── common/
│   │   ├── CollectionView.js    # Componente de tabla reutilizable
│   │   ├── FormComponent.js     # Componente de formulario
│   │   └── TableActions.js      # Botones Editar/Eliminar
│   ├── usuario/
│   │   ├── UsuarioCrud.js       # CRUD de usuarios
│   │   └── UsuarioList.js       # (obsoleto)
│   ├── libro/
│   │   ├── LibroCrud.js         # CRUD de libros
│   │   └── ...
│   ├── reserva/
│   │   ├── ReservaCrud.js       # CRUD de reservas
│   │   └── ...
│   ├── prestamo/
│   │   ├── PrestamoCrud.js      # CRUD de préstamos
│   │   └── ...
│   └── rol/
│       ├── RolCrud.js           # CRUD de roles
│       └── ...
├── api/
│   └── apiClient.js             # Cliente HTTP con Axios
├── App.js                        # Rutas principales
├── index.js                      # Punto de entrada
└── index.css                     # Estilos globales

public/
└── index.html                    # HTML raíz
```

## API Endpoints consumidos

El frontend llama a estos endpoints del backend:

### Usuarios
- GET `/usuario/all` → Listar todos
- GET `/usuario/byId/{id}` → Obtener uno
- POST `/usuario/create` → Crear
- PUT `/usuario/update/{id}` → Editar
- DELETE `/usuario/delete/{id}` → Eliminar

### Libros, Reservas, Préstamos
- Siguen el mismo patrón: `/libro`, `/reserva`, `/prestamo`

### Roles
- GET `/rol/all`
- GET `/rol/findById/{id}`
- POST `/rol/create/{rolName}` (parámetro en URL)
- PUT `/rol/update/{id}`
- DELETE `/rol/delete/{id}`

## Configuración

### Variables de entorno
Crear o editar `.env`:
```env
REACT_APP_API_BASE_URL=http://localhost:8080
```

Si el backend corre en otro puerto/host, cambiar la URL.

### CORS
Si tienes errores CORS al conectar con el backend:

1. **Opción A**: Añadir en los controladores Spring:
```java
@CrossOrigin(origins = "http://localhost:3000")
```

2. **Opción B**: Configurar CORS global en Spring.

## Cómo usar el CRUD

1. **Navegar** a un recurso (ej: "Usuarios")
2. **Ver tabla** con todos los registros
3. **Crear nuevo**: Clic en "+ Nuevo Usuario" → Rellenar formulario → Guardar
4. **Editar**: Clic en "Editar" en la fila → Cambiar datos → Guardar
5. **Eliminar**: Clic en "Eliminar" → Confirmar
6. **Refrescar**: Clic en "Refrescar" para recargar datos

## Troubleshooting

### Error: `Cannot GET /`
- Esperar a que `npm start` termine el build (toma 30-60 seg en primer inicio)

### Error: `CORS issue` o `Failed to fetch`
- Verificar que el backend corre en http://localhost:8080
- Añadir `@CrossOrigin` en controladores o configurar CORS global

### Error: `Cannot resolve module TableActions`
- Limpiar cache: `rm -r node_modules/.cache` o `npm start` nuevamente

### Los datos no aparecen en la tabla
- Abrir DevTools (F12) → Console y buscar errores HTTP
- Verificar que el backend devuelve JSON válido
- Revisar que las claves de DTO coincidan con las usadas en `columns` (ver `UsuarioCrud.js`)

## Notas de desarrollo

- FormComponent acepta campos con tipos: `text`, `number`, `date`, `textarea`
- CollectionView renderiza tablas con columnas customizables
- apiClient.js usa Axios con base URL configurable
- Warnings de ESLint son normales (Unused exports), no afectan funcionamiento

## Scripts disponibles

```bash
npm start        # Desarrollo
npm run build    # Producción
npm test         # Tests (si existen)
```

