# Fabric.js + TanStack Starter

A modern web application showcasing interactive canvas capabilities with Fabric.js, built on the TanStack ecosystem with full-stack TypeScript.

![Fabric.js TanStack](https://img.shields.io/badge/Fabric.js-6.0%2B-orange)
![TanStack](https://img.shields.io/badge/TanStack-Start%2BRouter-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **Interactive Canvas**: Advanced Fabric.js implementation with custom object controls
- **Modern Authentication**: Email + social auth powered by Better Auth
- **Type Safety**: Fully typed frontend and backend with TypeScript
- **Database ORM**: Drizzle ORM for SQL schema management
- **Beautiful UI**: ShadCN components with TailwindCSS styling

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+

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

The application will be available at `http://localhost:3000`

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
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   ├── routes/             # Application routes
│   ├── styles/             # Global styles
│   └── router.tsx          # Router configuration
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
└── vite.config.ts         # Vite configuration
```

## 🎨 Canvas Features

- Custom Fabric.js object controls and interactions
- Real-time canvas manipulation
- Object serialization and persistence
- Custom brush and drawing tools
- Zoom and pan functionality

## 🔐 Authentication

The app uses Better Auth for authentication with support for:

- Email/password authentication
- Social login providers
- Session management with secure cookies
- Role-based access control

## 🗄️ Database

- **ORM**: Drizzle for type-safe database operations
- **Migrations**: Automated schema migration system
- **Database**: PostgreSQL with Neon serverless driver

## 🛠️ Development Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm db:generate  # Generate database migrations
pnpm db:push      # Push schema to database
pnpm db:studio    # Open database studio
```

## 📊 UI Components

The project uses a comprehensive set of modern UI components:

- **Radix UI Primitives**: Accessible component primitives
- **ShadCN Components**: Beautifully designed components
- **Recharts**: Data visualization charts
- **Lucide React**: Modern icon library
- **Sonner**: Toast notifications

## 🌐 Deployment

### Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL="your_postgresql_connection_string"
AUTH_SECRET="your_auth_secret"
AUTH_URL="http://localhost:3000"
```

### Build for Production

```bash
pnpm build
pnpm start
```

## 📖 Documentation

### Adding New Routes

1. Create a new file in `src/routes/`
2. Export a React component as default
3. Use TanStack Router for type-safe routing

### Database Operations

Use Drizzle ORM for all database operations:

```typescript
import { db } from "~/db";
import { users } from "~/db/schemas";

// Example query
const allUsers = await db.select().from(users);
```

### Authentication

The auth client is available throughout the application:

```typescript
import { useAuth } from "~/lib/auth-client";

function MyComponent() {
  const { user, signIn, signOut } = useAuth();
  // ...
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing prettier configuration
- Write tests for new functionality
- Update documentation when needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any problems or have questions:

1. Check the existing GitHub Issues
2. Create a new issue with a detailed description
3. Reach out on Discord (for TanStack-related questions)

## 🙏 Acknowledgments

- [TanStack](https://tanstack.com/) for the amazing React ecosystem
- [Fabric.js](http://fabricjs.com/) for the powerful canvas library
- [Better Auth](https://better-auth.com/) for authentication
- [ShadCN](https://ui.shadcn.com/) for the beautiful UI components
- [Drizzle ORM](https://orm.drizzle.team/) for type-safe database operations
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives

---

Built with ❤️ using TanStack Start
