# Frontend Portfolio Web (React - TypeScript)

### Este repositorio contiene la implementación de la interfaz de usuario y el panel administrativo para la aplicación de portafolio personal.

El sistema está construido como una Single Page Application (SPA) utilizando React y TypeScript.
Su objetivo principal es proporcionar una experiencia de navegación fluida para los visitantes y una interfaz de gestión robusta para el administrador,
permitiendo la actualización dinámica de contenidos a través del consumo de la API REST del backend.

---

## Descripción Técnica

La aplicación está diseñada bajo una arquitectura modular y escalable, utilizando Hooks personalizados para la lógica de negocio y Servicios centralizados para la comunicación asíncrona.
Se prioriza el rendimiento y la seguridad del lado del cliente mediante la gestión de estados globales y rutas protegidas.

---

## Tecnologías Utilizadas:

#### Lenguaje: TypeScript

#### Framework Principal: React.js 18

#### Gestión de Estilos: Tailwind CSS

#### Enrutamiento: React Router DOM 6

#### Consumo de API: Fetch API / Axios

#### Gestión de Estado: React Hooks (Context API, useState, useEffect)

#### Gestión de Dependencias: npm / Vite

---

## Arquitectura del Cliente

El frontend separa estrictamente la visualización de la lógica de datos para asegurar un mantenimiento ágil y un código limpio:

### Tipado Estricto con TypeScript:

Se implementan interfaces rigurosas para todos los modelos de datos (Project, Experience, Skill, etc.), 
garantizando la integridad de la información desde la respuesta de la API hasta la renderización en el componente.

### Sistema de Autenticación:

Implementación de un AuthContext que gestiona el estado de sesión de forma global. 
Los tokens JWT provistos por el backend se administran y adjuntan en las cabeceras de las peticiones para autorizar cambios en el panel administrativo.

### Navegación Dinámica:

Gestión de rutas públicas para el perfil profesional y Rutas Privadas para el CMS, 
utilizando componentes de protección de ruta que verifican la validez del token JWT del usuario.

### UI/UX Responsiva:

Diseño basado en una filosofía Mobile-First utilizando Tailwind CSS. Se implementan layouts adaptativos que garantizan la simetría visual,
como la línea de tiempo de experiencia y las rejillas de proyectos, en cualquier resolución de pantalla.

---

## Instalación y Configuración

### Prerrequisitos:

#### - Node.js (Versión 18 o superior) instalado.

#### - Gestor de paquetes npm o yarn.

---

### Configuración de Variables de Entorno

#### Para que el frontend pueda comunicarse con el servicio backend, debe configurar la URL base de la API.

#### - Navegue a la raíz del proyecto.

#### - Cree un archivo llamado ```.env```

#### - Agregue el siguiente contenido reemplazando con su URL de backend:

```
VITE_API_URL=http://localhost:8080/api
```

---

## Ejecución del Proyecto

### Clone el repositorio:

```git clone <URL_DEL_REPOSITORIO>```

### Instale las dependencias:

```npm install```

### Inicie el servidor de desarrollo:

```npm run dev```

La aplicación estará disponible por defecto en ```http://localhost:5173```.

---

## Estructura del Proyecto

``` text
src/
├── assets/          # Imágenes, iconos y recursos estáticos
├── components/      # Componentes de UI reutilizables (Navbar, Footer, Cards)
├── context/         # Gestión de estado global (Autenticación)
├── hooks/           # Lógica personalizada (useApi, useActiveSection, useAuth)
├── pages/           # Vistas principales (Home, Login, AdminPanel)
├── services/        # Clientes de API y peticiones al backend (apiService)
├── types/           # Definición de interfaces y tipos de TypeScript
└── utils/           # Formateadores de fecha y funciones de ayuda
```

---

## Funcionalidades del Panel Administrativo (CMS)

El panel privado permite al administrador gestionar el contenido del portafolio en tiempo real mediante operaciones CRUD:

| Método | Recurso | Descripción | Acceso |
|:-------|:--------|:------------|:-------|
| **CRUD** | `Proyectos` | Gestión de títulos, descripciones, logos y enlaces. | **Admin** |
| **CRUD** | `Experiencia` | Edición de cargos, empresas, periodos y descripción. | **Admin** |
| **CRUD** | `Educación` | Gestión de títulos académicos e instituciones. | **Admin** |
| **CRUD** | `Habilidades` | Adición y remoción de tecnologías del stack técnico. | **Admin** |
| **PUT** | `Perfil (User)` | Actualización de biografía, título y redes sociales. | **Admin** |

---

## Seguridad y Control de Sesión

| Componente | Implementación |
|:-----------|:---------------|
| **Autenticación** | Módulo de login vinculado al endpoint `/api/auth/login`. |
| **Autorización** | Interceptor de peticiones para adjuntar el token **JWT** en los headers. |
| **Protección** | Wrappers de rutas (Private Routes) para restringir acceso no autorizado. |

---

## Manejo de Estados y Feedback

| Estado | Descripción |
|:-------|:------------|
| **Loading** | Indicadores visuales durante la carga de datos de la API. |
| **Error Handling** | Captura de excepciones de red y errores de validación (400, 401, 403, 404). |
| **Persistence** | Sincronización inmediata de la UI tras operaciones de escritura exitosas. |

---

## Manejo de Estados y Errores

La aplicación implementa un sistema de feedback proactivo para mejorar la experiencia de usuario:

#### Loading States: Esqueletos o indicadores de carga durante la sincronización con la API.

#### Error Handling: Captura de excepciones de red y errores de validación del backend (400, 401, 404).

#### Token Expiration: Detección automática de tokens expirados con redirección inmediata al módulo de Login.
