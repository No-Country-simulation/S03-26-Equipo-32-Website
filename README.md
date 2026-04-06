# PLEK – Sistema de Generación de Leads B2B

![Status](https://img.shields.io/badge/status-en%20desarrollo-yellow)
![Tech](https://img.shields.io/badge/tech-React%20%7C%20Tailwind%20CSS-blue)
![Equipo](https://img.shields.io/badge/equipo-32-purple)

Website de generación de leads B2B para PLEK. Landing page con formularios inteligentes y dashboard de métricas. Desafío Marketing & Growth.

---

## 📌 Descripción

Diseñar e implementar un sistema integrado de generación y cualificación de leads B2B para PLEK, optimizando la presencia en web y redes sociales.

## 🎯 Objetivo Principal

Construir un prototipo funcional de un embudo de ventas digital que permita aumentar el volumen de leads calificados y medir la efectividad de las acciones de marketing.

---

## 📦 Entregables

### 1. Estrategia y Contenido (Marketing & Growth)

Propuesta de campaña de contenido (lead magnets) e integración en web y redes sociales para atraer al cliente ideal.

### 2. Funcionalidad Web (Desarrollo de MVP)

Implementación de un micro-sitio / landing page con formularios inteligentes y llamadas a la acción claras.

### 3. Medición (Análisis de Datos) _(deseable)_

Dashboard interactivo con métricas en tiempo real:

- Fuentes de tráfico
- Tasa de conversión web
- Origen y cantidad de leads generados

---

## 🛠️ Tech Stack

| Tecnología   | Uso                                                             |
| ------------ | --------------------------------------------------------------- |
| React + Vite | Framework frontend                                              |
| TypeScript   | Tipado estático                                                 |
| Tailwind CSS | Estilos y diseño                                                |
| React Router | Navegación SPA (`/`, `/login`, `/panel-general`, `/prospectos`) |
| Firebase     | Autenticación y sesión de usuario                               |
| Husky        | Git hooks y calidad de código                                   |
| pnpm         | Gestor de paquetes                                              |

---

## 📁 Estructura del Proyecto

```
S03-26-Equipo-32-Website/
├── public/
│   ├── _reedirects
│   └── landing/
├── src/
│   ├── components/
│   │   ├── ProtectedRoute.tsx
│   │   ├── features/
│   │   │   └── lead-form/
│   │   │       └── ui/
│   │   │           └── LeadForm.tsx
│   │   ├── pages/
│   │   │   ├── dashboard/
│   │   │   │   └── ui/
│   │   │   │       └── page.tsx
│   │   │   └── landing/
│   │   │       └── ui/
│   │   │           ├── Contact.tsx
│   │   │           ├── DifferentiatorItem.tsx
│   │   │           ├── Differentiators.tsx
│   │   │           ├── FAQ.tsx
│   │   │           ├── Footer.tsx
│   │   │           ├── Hero.tsx
│   │   │           ├── HowItWorks.tsx
│   │   │           ├── HowItWorksItem.tsx
│   │   │           ├── Navbar.tsx
│   │   │           ├── page.tsx
│   │   │           ├── PopularCatalog.tsx
│   │   │           ├── Question.tsx
│   │   │           └── Testimonials.tsx
│   │   └── share/
│   │       ├── constants.ts
│   │       └── ui/
│   │           └── logo.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── core/
│   │   ├── containers/
│   │   │   └── user.container.ts
│   │   ├── database/
│   │   │   ├── firebase/
│   │   │   │   └── firebase.config.ts
│   │   │   ├── mappers/
│   │   │   │   └── user.mapper.ts
│   │   │   └── repositories/
│   │   │       └── users.repository.ts
│   │   └── users/
│   │       ├── entities/
│   │       │   └── user.entity.ts
│   │       ├── repositories/
│   │       │   └── user.repository.ts
│   │       └── use-cases/
│   │           ├── find-user-by-id.use-case.ts
│   │           ├── login.use-case.ts
│   │           └── logout.use-case.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── eslint.config.js
├── firebase.json
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🚀 Getting Started

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

---

## 🔐 Autenticación

El flujo de autenticación usa Firebase Auth con Google OAuth.
El estado global se maneja mediante `AuthContext` con `AuthProvider`.
Actualmente, las rutas privadas se protegen desde `LayoutDashboard`: si no hay un usuario autenticado (`!user`), se redirige a `/login` mediante `Navigate`.

```tsx
// Protección de rutas privadas desde el layout del dashboard
if (!user) return <Navigate to="/login" replace />;
```

---

## 📐 Convenciones

- Variables booleanas con prefijo `is` → `isLoading`
- Callbacks con prefijo `on` → `onChangeLeadStatus`
- Commits en conventional commits → `feat:`, `fix:`, `style:`

---

## 🌐 Deploy

[b2b-plek-com-mx.web.app](https://b2b-plek-com-mx.web.app)

---

## 👥 Equipo

| Nombre            | Rol                  | LinkedIn                                                   |
| ----------------- | -------------------- | ---------------------------------------------------------- |
| Bryan Lundberg    | Full Stack Developer | [🔗 Perfil](https://www.linkedin.com/in/bryan-lundberg/)   |
| Hazael Degante    | UX/UI Designer       | [🔗 Perfil](https://www.linkedin.com/in/hazaelld/)         |
| Héctor Duarte     | Frontend Developer   | [🔗 Perfil](https://www.linkedin.com/in/hector-duarte/)    |
| Jhorman Nieto     | Frontend Developer   | [🔗 Perfil](https://www.linkedin.com/in/jhormandev/)       |
| Justina Gargano   | UX/UI Designer       | [🔗 Perfil](https://www.linkedin.com/in/justinagargano/)   |
| Natividad Romero  | UX/UI Designer       | [🔗 Perfil](https://www.linkedin.com/in/natyromero/)       |
| Silvana Motta     | Community Manager    | [🔗 Perfil](https://www.linkedin.com/in/silvana-motta/)    |
| Valentina Briceño | Graphic Designer     | [🔗 Perfil](https://www.linkedin.com/in/valentinabriceno/) |

---

## 📄 Licencia

Este proyecto fue desarrollado en el marco de un desafío académico/profesional de No Country.
