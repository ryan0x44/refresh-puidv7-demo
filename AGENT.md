# Agent Guide for refresh-puidv7-demo

## Commands
- **Build**: `bun run build` - Create production build
- **Dev**: `bun run dev` - Start development server (http://localhost:5173)
- **Typecheck**: `bun run typecheck` - Run TypeScript type checking
- **Start**: `bun run start` - Start production server
- **DB Generate**: `bun run drizzle-kit generate` - Generate database migrations
- **DB Push**: `bun run drizzle-kit push` - Push schema changes to database
- **Start Dev DB Server**: `docker compose up -d` - Runs postgres for dev
- **Stop Dev DB Server**: `docker compose down` - Stops postgres for dev

## Architecture
- **Framework**: React Router v7 with SSR enabled
- **Database**: PostgreSQL with Drizzle ORM (schema in `app/db/schema.ts`)
- **Styling**: TailwindCSS v4
- **Build**: Vite bundler
- **Structure**:
  - `app/` - Main application code
  - `app/routes/` - Route components
  - `app/db/` - Database schema and config
  - `migrations/` - Database migrations
  - `public/` - Static assets

## Code Style
- **TypeScript**: Strict mode enabled, ES2022 target
- **Imports**: Use `~/*` alias for app directory imports
- **Routes**: Define in `app/routes.ts`, components in `app/routes/`
- **Database**: Use Drizzle ORM with PostgreSQL, connection string: `postgres://postgres:refresh25@127.0.0.1:5432/demo`
- **Formatting**: Follow existing patterns, use TypeScript strict types
