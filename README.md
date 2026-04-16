# PLEK – Sistema de Generación de Leads B2B

![Status](https://img.shields.io/badge/status-en%20desarrollo-yellow)
![Tech](https://img.shields.io/badge/tech-React%20%7C%20TypeScript%20%7C%20Firebase-blue)
![Equipo](https://img.shields.io/badge/equipo-32-purple)

Website de generación de leads B2B para PLEK. Landing page con formularios inteligentes, dashboard analítico con métricas en tiempo real y gestión completa de prospectos.

---

## Descripción

Sistema integrado de generación y cualificación de leads B2B para PLEK, con presencia web optimizada. Incluye landing page pública, panel de administración con métricas y un módulo de gestión de prospectos con scoring automático.

## Objetivo Principal

Construir un prototipo funcional de embudo de ventas digital que permita aumentar el volumen de leads calificados y medir la efectividad de las acciones de marketing.

---

## Rutas

| Ruta             | Descripción                   | Acceso    |
| ---------------- | ----------------------------- | --------- |
| `/`              | Landing page pública          | Público   |
| `/login`         | Inicio de sesión con Google   | Público   |
| `/panel-general` | Dashboard con KPIs y métricas | Protegido |
| `/prospectos`    | Gestión y filtrado de leads   | Protegido |

---

## Funcionalidades

### Landing Page (`/`)

- Hero con llamada a la acción
- Sección de diferenciadores
- Cómo funciona (paso a paso)
- Catálogo popular
- Testimonios
- Preguntas frecuentes (FAQ)
- Formulario de contacto/captura de leads con validación (React Hook Form + Zod)
- Footer con links

### Dashboard (`/panel-general`)

- **KPI Overview**: Visitantes totales, Clics en catálogo, Leads generados, Conversión a contacto, Leads calificados (SQL) — con indicadores de tendencia
- **Embudo de conversión**: Visualización vertical de Visitantes → Forms iniciados → Cotizaciones enviadas → Contactados con porcentajes relativos
- **Gráfica de visitas**: Área chart con selector de rango temporal
- **Clientes potenciales**: Distribución por tipo de negocio con barras de progreso
- **Canal de adquisición**: Donut chart con fuentes de leads (Instagram, SAPICA, Google, Otro)
- **Mapa de regiones**: Mapa interactivo con marcadores por país/ciudad y ranking de top 3 países
- Filtro de rango de fechas persistido en URL (nuqs)
- Responsive: grid 2 columnas en mobile, 5 columnas en desktop

### Gestión de Leads (`/prospectos`)

- **Vista mobile**: Cards clickeables con badge de score, nombre, estado y fecha corta
- **Vista desktop**: Tabla con columnas Puntaje, Empresa, Contacto, Fecha, Volumen, Estado y Acciones
- Barra de búsqueda por nombre de empresa o contacto
- Filtros por Prioridad, Urgencia y Estado (persistidos en URL)
- Filtro de rango de fechas
- Paginación (10 leads por página) con flechas prev/next en mobile
- **Detalle del lead**: Sheet lateral con información completa, cambio de estado y notas
- Menú `...` en el detalle con opción "Eliminar lead" + modal de confirmación
- **Scoring automático** de leads (0–100 pts) basado en tipo de negocio, volumen estimado y urgencia
- Clasificación de prioridad: Alta (≥70), Media (≥45), Baja (<45)
- Contacto directo por WhatsApp desde tabla y detalle
- Eliminación con confirmación

---

## Tech Stack

| Tecnología          | Uso                                                              |
| ------------------- | ---------------------------------------------------------------- |
| React 19 + Vite     | Framework frontend y bundler                                     |
| TypeScript          | Tipado estático                                                  |
| Tailwind CSS v4     | Estilos y diseño responsivo                                      |
| React Router v7     | Navegación SPA                                                   |
| Firebase            | Auth (Google OAuth), Firestore (leads), Analytics (estadísticas) |
| Recharts            | Gráficas de visitas y canales de adquisición                     |
| react-simple-maps   | Mapa interactivo de regiones                                     |
| React Hook Form     | Manejo de formularios                                            |
| Zod                 | Validación de esquemas                                           |
| nuqs                | Estado de filtros persistido en URL                              |
| moment              | Cálculo y formateo de fechas                                     |
| lucide-react        | Iconografía                                                      |
| tailwind-merge      | Combinación segura de clases Tailwind                            |
| motion              | Animaciones                                                      |
| Husky + lint-staged | Git hooks y formateo automático con Prettier                     |
| pnpm                | Gestor de paquetes                                               |

---

## Arquitectura

El proyecto sigue una arquitectura limpia por capas:

```
core/               → Lógica de negocio agnóstica del framework
  leads/            → Entidades, repositorios e interfaces de leads
  statistics/       → Entidades y casos de uso de estadísticas
  users/            → Entidades y casos de uso de usuarios
  database/         → Implementaciones Firebase (repositorios, mappers)
  containers/       → Inyección de dependencias

components/
  features/         → Funcionalidades reutilizables (formulario, sidebar, estadísticas)
  pages/            → Páginas organizadas por ruta (dashboard, landing, leads-manager, login)
    ui/             → Componentes de presentación
    model/          → Hooks y lógica de UI
    lib/            → Utilidades específicas de la página
  share/            → Componentes y constantes compartidas

context/            → Contextos React (Auth, Modal)
```

---

## Estructura del Proyecto

```
S03-26-Equipo-32-Website/
├── public/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── ModalContext.tsx
│   ├── components/
│   │   ├── LayoutDashboard.tsx
│   │   ├── features/
│   │   │   ├── lead-form/
│   │   │   ├── leads/
│   │   │   ├── logout/
│   │   │   ├── sidebar/
│   │   │   └── statistics/
│   │   ├── pages/
│   │   │   ├── dashboard/
│   │   │   │   ├── lib/dateRangePresets.ts
│   │   │   │   ├── model/
│   │   │   │   │   ├── useDashboardFilter.ts
│   │   │   │   │   └── useLeadsDashboard.ts
│   │   │   │   └── ui/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── DashboardHeader.tsx
│   │   │   │       ├── KPIOverview.tsx
│   │   │   │       ├── KPIItem.tsx
│   │   │   │       ├── ConversionFunnel.tsx
│   │   │   │       ├── FunnelCard.tsx
│   │   │   │       ├── LeadsDashboard.tsx
│   │   │   │       ├── RegionMapCard.tsx
│   │   │   │       └── DateRangeSelector.tsx
│   │   │   ├── landing/
│   │   │   │   └── ui/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── Hero.tsx
│   │   │   │       ├── Differentiators.tsx
│   │   │   │       ├── HowItWorks.tsx
│   │   │   │       ├── PopularCatalog.tsx
│   │   │   │       ├── Testimonials.tsx
│   │   │   │       ├── FAQ.tsx
│   │   │   │       ├── Contact.tsx
│   │   │   │       ├── Navbar.tsx
│   │   │   │       └── Footer.tsx
│   │   │   ├── leads-manager/
│   │   │   │   ├── lib/scoreLeads.ts
│   │   │   │   ├── model/
│   │   │   │   │   ├── usePriorityFilter.ts
│   │   │   │   │   ├── useStatusFilter.ts
│   │   │   │   │   ├── useUrgencyFilter.ts
│   │   │   │   │   └── leadsFilterOptions.ts
│   │   │   │   └── ui/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── LeadsTable.tsx
│   │   │   │       ├── LeadsManagerFilters.tsx
│   │   │   │       ├── LeadDetailSheet.tsx
│   │   │   │       ├── DeleteLeadModal.tsx
│   │   │   │       └── ScoringRules.tsx
│   │   │   └── login/
│   │   │       └── ui/page.tsx
│   │   └── share/
│   │       ├── constants.ts
│   │       └── ui/
│   │           ├── CustomSelect.tsx
│   │           ├── Input.tsx
│   │           ├── Textarea.tsx
│   │           ├── Checkbox.tsx
│   │           ├── Select.tsx
│   │           ├── Label.tsx
│   │           ├── WhatsAppIcon.tsx
│   │           └── logo.tsx
│   └── core/
│       ├── containers/
│       │   ├── lead.container.ts
│       │   ├── statistics.container.ts
│       │   └── user.container.ts
│       ├── database/
│       │   ├── firebase/firebase.config.ts
│       │   ├── mappers/
│       │   └── repositories/
│       ├── leads/
│       ├── statistics/
│       └── users/
├── index.html
├── package.json
├── pnpm-lock.yaml
├── vite.config.ts
├── tsconfig.json
└── eslint.config.js
```

---

## Getting Started

### Prerrequisitos

- Node.js >= 18
- pnpm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/No-Country-simulation/S03-26-Equipo-32-Website.git

# Entrar al proyecto
cd S03-26-Equipo-32-Website

# Instalar dependencias
pnpm install

# Iniciar en desarrollo
pnpm dev
```

### Scripts disponibles

```bash
pnpm dev        # Servidor de desarrollo (puerto 5173)
pnpm build      # Build de producción
pnpm preview    # Preview del build
pnpm lint       # Linter ESLint
pnpm format     # Formateo con Prettier
```

---

## Autenticación

El flujo de autenticación usa Firebase Auth con Google OAuth.
El estado global se maneja mediante `AuthContext` con `AuthProvider`.
Las rutas privadas se protegen desde `LayoutDashboard`: si no hay usuario autenticado, se redirige a `/login`.

```tsx
if (!user) return <Navigate to="/login" replace />;
```

---

## Scoring de Leads

El sistema califica automáticamente cada lead (0–100 pts):

| Criterio       | Opciones y puntos                                                              |
| -------------- | ------------------------------------------------------------------------------ |
| Tipo negocio   | Distribuidor: 40 · Regalo corp.: 30 · T. regalos: 25 · Boutique: 20 · Otro: 10 |
| Volumen compra | >$20k MXN: 40 · $15–20k: 30 · $10–15k: 15 · <$10k: 10                          |
| Urgencia       | Lo antes posible: 15 · Próximas semanas: 8 · Solo explorando: 3                |

Prioridad: **Alta** ≥70 pts · **Media** ≥45 pts · **Baja** <45 pts

---

## Convenciones

- Variables booleanas con prefijo `is` → `isLoading`
- Callbacks con prefijo `on` → `onMarkContacted`
- Commits en Conventional Commits → `feat:`, `fix:`, `style:`, `chore:`
- Ramas de features → `feature/<nombre>`

---

## Deploy

| Entorno    | URL                                                                        |
| ---------- | -------------------------------------------------------------------------- |
| Producción | [b2b-plek-com-mx.web.app](https://b2b-plek-com-mx.web.app)                 |
| Staging    | [b2b-plek-com-mx-staging.web.app](https://b2b-plek-com-mx-staging.web.app) |

---

## Equipo

| Nombre           | Rol                  | LinkedIn                                              |
| ---------------- | -------------------- | ----------------------------------------------------- |
| Bryan Lundberg   | Full Stack Developer | [Perfil](https://www.linkedin.com/in/bryan-lundberg/) |
| Hazael Degante   | UX/UI Designer       | [Perfil](https://www.linkedin.com/in/hazaelld/)       |
| Héctor Duarte    | Frontend Developer   | [Perfil](https://www.linkedin.com/in/hector-duarte/)  |
| Jhorman Nieto    | Frontend Developer   | [Perfil](https://www.linkedin.com/in/jhormandev/)     |
| Justina Gargano  | UX/UI Designer       | [Perfil](https://www.linkedin.com/in/justinagargano/) |
| Natividad Romero | UX/UI Designer       | [Perfil](https://www.linkedin.com/in/natyromero/)     |

---

## Licencia

Este proyecto fue desarrollado en el marco de un desafío académico/profesional de No Country.
