# S03-26-Equipo-32-Website
Website de generación de leads B2B para PLEK. Landing page con formularios  inteligentes y dashboard de métricas. Desafío Marketing &amp; Growth.
# PLEK – Sistema de Generación de Leads B2B
![Status](https://img.shields.io/badge/status-en%20desarrollo-yellow)
![Tech](https://img.shields.io/badge/tech-React%20%7C%20Tailwind%20CSS-blue)
![Equipo](https://img.shields.io/badge/equipo-32-purple)
Desafío con enfoque integral de **Marketing & Growth**.
---
## 📌 Descripción
Diseñar e implementar un sistema integrado de generación y cualificación
de leads B2B para PLEK, optimizando la presencia en web y redes sociales.
---
## 🎯 Objetivo Principal
Construir un prototipo funcional de un embudo de ventas digital que permita
aumentar el volumen de leads calificados y medir la efectividad de las
acciones de marketing.
---
## 📦 Entregables
### 1. Estrategia y Contenido (Marketing & Growth)
Propuesta de campaña de contenido (lead magnets) e integración en web y
redes sociales para atraer al cliente ideal.
### 2. Funcionalidad Web (Desarrollo de MVP)
Implementación de un micro-sitio / landing page con formularios inteligentes
y llamadas a la acción claras.
### 3. Medición (Análisis de Datos) *(deseable)*
Dashboard interactivo con métricas en tiempo real:
- Fuentes de tráfico
- Tasa de conversión web
- Origen y cantidad de leads generados
---
## 🛠️ Tech Stack
| Tecnología | Uso |
|------------|-----|
| React + Vite | Framework frontend |
| TypeScript | Tipado estático |
| Tailwind CSS | Estilos y diseño |
| React Router | Navegación SPA (`/`, `/plek-admin`, `/dashboard`) |
| Firebase | Autenticación y sesión de usuario |
| Husky | Git hooks y calidad de código |
| pnpm | Gestor de paquetes |
---
## 📁 Estructura del Proyecto

La arquitectura está dividida en dos capas principales: **Frontend (React)** y **Backend**, siguiendo un patrón de organización modular y escalable.

```bash
S03-26-Equipo-32-Website/
├── public/
├── src/
│   ├── assets/
│   ├── components/         # Frontend – React
│   │   ├── page/           # Componentes de página
│   │   ├── shared/         # Componentes compartidos
│   │   ├── ui/             # Componentes de interfaz
│   │   └── widgets/        # Widgets reutilizables
│   │       └── [component]/
│   │           ├── hooks/  # Hooks, consts, mappers, etc.
│   │           ├── model/  # Modelos del componente
│   │           └── ui/     # UI del componente
│   ├── core/               # Backend (Clean Architecture)
│   │   └── entities/
│   │       └── user/
│   │           ├── dto/
│   │           ├── entity/
│   │           └── use-case/
│   └── App.tsx
├── .gitignore
├── index.html
├── eslint.config.js
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── pnpm-lock.yaml
├── package.json
└── README.md
```

> **Nota:** No se exponen endpoints REST. El backend provee funciones listas para consumir directamente desde el frontend. Ejemplo de uso:
> ```js
> userContainer.login.execute(data)
> ```

---
## 🚀 Getting Started
### Prerrequisitos
- Node.js >= 18
- pnpm
### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/tu-org/S03-26-Equipo-32-Website.git
# Entrar al proyecto
cd S03-26-Equipo-32-Website
# Instalar dependencias
pnpm install
# Iniciar en desarrollo
pnpm dev
```
---
## 👥 Equipo
| Nombre | Rol | LinkedIn |
|--------|-----|----------|
| Bryan Lundberg | Full Stack Developer | [🔗 Perfil](https://www.linkedin.com/in/bryan-lundberg/) |
| Hazael Degante | UX/UI Designer | [🔗 Perfil](https://www.linkedin.com/in/hazaelld/) |
| Héctor Duarte | Frontend Developer | [🔗 Perfil](https://www.linkedin.com/in/hector-duarte/) |
| Jhorman Nieto | Frontend Developer | [🔗 Perfil](https://www.linkedin.com/in/jhormandev/) |
| Justina Gargano | UX/UI Designer | [🔗 Perfil](https://www.linkedin.com/in/justinagargano/) |
| Natividad Romero | UX/UI Designer | [🔗 Perfil](https://www.linkedin.com/in/natyromero/) |
| Silvana Motta | Community Manager | [🔗 Perfil](https://www.linkedin.com/in/silvana-motta/) |
## 📄 Licencia
Este proyecto fue desarrollado en el marco de un desafío académico/profesional.
