# Welcome to the FabricJS Hub

A modern web application showcasing interactive canvas capabilities with Fabric.js, built on the TanStack ecosystem with full-stack TypeScript.

![Fabric.js TanStack](https://img.shields.io/badge/Fabric.js-6.0%2B-orange)
![TanStack](https://img.shields.io/badge/TanStack-Start%2BRouter-blue)
![Better Auth](https://img.shields.io/badge/Better%20Auth-Email%2BGoogle%2BGitHub-green)
![License](https://img.shields.io/badge/License-MIT-green)

## About This Project

This is a comprehensive demo showcasing Fabric.js custom controls with a modern Tanstack Router and Better Auth integration.

The application features a complete authentication system with protected routes and a powerful canvas editor with custom controls, drag-and-drop functionality, and real-time canvas manipulation.

## ✨ Features

- **Interactive Canvas**: Advanced Fabric.js implementation with custom object controls and transformations
- **Modern Authentication**: Email + social auth (Google) powered by Better Auth
- **Type Safety**: Fully typed frontend and backend with TypeScript
- **Database ORM**: Drizzle ORM for SQL schema management
- **Beautiful UI**: ShadCN components with TailwindCSS styling
- **Custom Controls**: Enhanced Fabric.js controls with SVG icons
- **Drag & Drop**: Intuitive element placement from sidebar to canvas
- **Protected Routes**: Authentication-required routes with middleware
- **Responsive Design**: Works seamlessly across different screen sizes

## 📸 Screenshots

![Canvas Editor Interface](/src/assets/editor-screenshot.png)
_Interactive canvas editor with custom controls_

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/Avinash-Tallapaneni/fabricjs-tanstack-better-auth.git
cd fabricjs-tanstack-better-auth

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and other settings

# Set up database
pnpm db:push

# Start development server
pnpm dev
```

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="your_postgresql_connection_string"
AUTH_DRIZZLE_URL="your_postgresql_connection_string"

# Authentication
BETTER_AUTH_SECRET="your_auth_secret_32_chars_min"
BASE_URL="http://localhost:3000"

# Social Providers
GOOGLE_CLIENT_ID="your_google_oauth_client_id"
GOOGLE_CLIENT_SECRET="your_google_oauth_client_secret"

# Optional: Skip env validation for production
SKIP_ENV_VALIDATION="true"
```

## 📁 Project Structure

```
fabricjs-tanstack-better-auth/
├── src/
│   ├── components/          # React components
│   │   ├── auth/           # Authentication components
│   │   ├── editor/         # Canvas editor components
│   │   ├── sidebar/        # Navigation sidebar
│   │   └── ui/             # ShadCN UI components
│   ├── db/                 # Database configuration
│   │   └── src/
│   │       └── schemas/    # Database schemas
│   ├── env/                # Environment configuration
│   │   ├── env.client.ts   # Client-side environment variables
│   │   └── env.server.ts   # Server-side environment variables
│   ├── hooks/              # Custom React hooks
│   │   ├── applyCustomControls.ts  # Fabric.js custom controls
│   │   └── getCSSVariable.ts       # CSS variable utility
│   ├── lib/                # Utility libraries
│   │   ├── auth.ts         # Better Auth configuration
│   │   ├── auth-client.ts  # Client-side auth utilities
│   │   ├── auth-server.ts  # Server-side auth functions
│   │   └── auth-middleware.ts # Authentication middleware
│   ├── routes/             # Application routes
│   │   ├── editor/         # Canvas editor route
│   │   ├── auth/           # Authentication routes
│   │   └── protected/      # Protected routes
│   ├── styles/             # Global styles
│   ├── constants.ts        # Application constants
│   └── router.tsx          # Router configuration
├── public/                 # Static assets
├── assets/                 # SVG icons and images
├── package.json            # Dependencies and scripts
└── vite.config.ts         # Vite configuration
```

## 🎨 Canvas Features

- **Custom Fabric.js Controls**: Enhanced controls with SVG icons for better UX
- **Real-time Canvas Manipulation**: Interactive object transformation
- **Drag & Drop Interface**: Intuitive element placement from sidebar
- **Object Serialization**: Canvas state persistence
- **Multiple Object Types**: Text, Rectangle, Circle, Button, and Video placeholders
- **Visual Feedback**: Drag previews and hover effects
- **[WIP] Custom Brush & Drawing Tools**: Advanced drawing capabilities
- **[WIP] Zoom & Pan Functionality**: Smooth canvas navigation

## 🔐 Authentication System

The app uses Better Auth for authentication with support for:

- **Email/Password Authentication**: Secure sign-up and sign-in
- **Social Login Providers**: Google OAuth integration (GitHub ready)
- **Session Management**: Secure cookies with caching
- **Protected Routes**: Middleware-based access control
- **[WIP] Role-based Access**: Future-ready for user roles

### Authentication Flow

1. **Client-Side**: `auth-client.ts` handles frontend auth operations
2. **Server-Side**: `auth.ts` configures Better Auth with Drizzle adapter
3. **Middleware**: `auth-middleware.ts` protects routes and provides user context
4. **API**: `auth-server.ts` exposes server functions for user data

## 🗄️ Database

- **ORM**: Drizzle for type-safe database operations
- **Migrations**: Automated schema migration system
- **Database**: PostgreSQL with Neon serverless driver
- **Adapter**: Better Auth Drizzle adapter for seamless integration

## 🛠️ Development Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm db:generate  # Generate database migrations
pnpm db:push      # Push schema to database
pnpm db:studio    # Open database studio
```

### Build for Production

```bash
pnpm build
pnpm start
```

## 📖 Documentation

### Adding New Canvas Elements

1. Define the element in `navElementItems` type
2. Add preview size in `PREVIEW_SIZES` constant
3. Implement creation logic in `createElement()` function in `custom-editor.tsx`
4. Add corresponding SVG assets if needed

### Custom Fabric.js Controls

The `applyCustomControls.ts` file enhances Fabric.js objects with:

- Custom corner controls for uniform scaling
- Edge controls for X/Y scaling
- Rotation control with custom icon
- SVG-based control rendering

### Authentication Integration

```typescript
// Client-side usage
import { authClient } from "~/lib/auth-client";

function MyComponent() {
  const { user, signIn, signOut } = useAuth();
  // ...
}

// Server-side usage
import { getUser } from "~/lib/auth-server";

const user = await getUser();
```

### Environment Configuration

- `env.client.ts`: Client-side environment variables (public)
- `env.server.ts`: Server-side environment variables (private)
- Uses `@t3-oss/env-core` for type-safe environment validation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Fabric.js](http://fabricjs.com/) for the powerful canvas library
- [Better Auth](https://better-auth.com/) for authentication system
- [ShadCN](https://ui.shadcn.com/) for the beautiful UI components
- [Drizzle ORM](https://orm.drizzle.team/) for type-safe database operations
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [TanStack](https://tanstack.com/) for the modern React ecosystem
- [Lucide](https://lucide.dev/) for beautiful icons

---
