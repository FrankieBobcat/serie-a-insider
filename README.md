# Serie A Insider

Una aplicación web completa dedicada al fútbol italiano (Serie A) con características PWA, que incluye noticias, información de equipos, resultados de partidos, tienda de mercancía y contenido multimedia.

## 🚀 Características

- **📰 Noticias**: Últimas noticias del fútbol italiano
- **⚽ Equipos**: Información detallada de todos los equipos de Serie A
- **📊 Resultados**: Resultados en vivo y estadísticas de partidos
- **🛒 Tienda**: Mercancía oficial de los equipos
- **🎥 Multimedia**: Videos destacados y contenido visual
- **📱 PWA**: Aplicación web progresiva para dispositivos móviles
- **🔔 Newsletter**: Suscripción a boletín de noticias
- **🧩 Quizzes**: Quizzes interactivos para los fanáticos
- **📱 Compartir Social**: Funcionalidad de compartir en redes sociales

## 🛠️ Tecnologías

### Frontend
- **React** con TypeScript
- **Wouter** para enrutamiento
- **TanStack Query** para manejo de estado del servidor
- **Tailwind CSS** + **Radix UI** para estilos
- **React Hook Form** + **Zod** para formularios

### Backend
- **Express.js** con TypeScript
- **PostgreSQL** con **Drizzle ORM**
- **Stripe** para pagos
- **SendGrid** para emails

### Características PWA
- Service Worker
- Manifest de aplicación
- Diseño móvil-first
- Pull-to-refresh

## 🚀 Instalación y Ejecución

```bash
# Clonar el repositorio
git clone https://github.com/FrankieBobcat/serie-a-insider.git
cd serie-a-insider

# Instalar dependencias
npm install

# Configurar variables de entorno
# DATABASE_URL, STRIPE_SECRET_KEY, VITE_STRIPE_PUBLIC_KEY

# Ejecutar en modo desarrollo
npm run dev
```

## 📁 Estructura del Proyecto

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/         # Páginas de la aplicación
│   │   ├── lib/           # Utilidades y configuración
│   │   └── hooks/         # Custom hooks
├── server/                 # Backend Express
│   ├── routes.ts          # API endpoints
│   └── storage.ts         # Capa de almacenamiento
├── shared/                 # Código compartido
│   └── schema.ts          # Esquemas de base de datos
└── public/                # Archivos estáticos
```

## 🌟 Características Destacadas

- **Arquitectura Modern Stack**: React + TypeScript + Express
- **Base de Datos Type-Safe**: Drizzle ORM con PostgreSQL
- **Diseño Responsive**: Optimizado para todos los dispositivos
- **SEO Optimizado**: Meta tags y Open Graph
- **Integración de Pagos**: Stripe para e-commerce
- **Email Marketing**: SendGrid para newsletters
- **Social Sharing**: Compartir en múltiples plataformas

## 🎯 Roadmap

- [ ] Autenticación de usuarios
- [ ] API de datos deportivos en tiempo real
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Internacionalización

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

Desarrollado con ❤️ para los fanáticos de la Serie A