# rr-monorepo

A highly opinionated TypeScript monorepo boilerplate for building full-stack apps.

Note: This setup is intentionally opinionated and will remain a WIP as I learn and adopt better patterns over time.

## Stack

- **Runtime**: Node.js >= 24, pnpm workspaces
- **Build**: Turbo for task orchestration
- **Linting**: oxlint (no ESLint)
- **Formatting**: Prettier with composable base config
- **Language**: TypeScript 5, strict mode

## Apps

### apps/static
Static website (marketing pages, docs, landing pages).
- Astro 6, Tailwind CSS 4, DaisyUI, Lucide icons

### apps/backend
Backend service with database and REST APIs.
- Fastify 5, PostgreSQL, Drizzle ORM, Zod validation
- Module pattern: schema → service → handler → router

### apps/webapp
Full web application (dashboards, SaaS, etc.).
- TanStack Start, React 19, Vite, Tailwind CSS 4, shadcn/ui (base-nova with Base UI)
- TanStack Router (file-based), TanStack Query, TanStack Form
- Frontend module pattern: service → queries → components

### apps/fullstack-convex
Full-stack app with Convex serverless backend.
- TanStack Start, React 19, Vite, Convex, shadcn/ui (base-nova with Base UI)
- Convex module pattern: schema → helpers → queries → mutations

## Packages

### packages/shared/dto
Shared Zod schemas (DTOs) consumed by backend and webapp.

---

If you spot something off or have a better pattern in mind, it's probably on the roadmap—or about to be.
