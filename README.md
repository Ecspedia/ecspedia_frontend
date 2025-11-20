# Ecspedia - Travel Booking Platform

A modern travel booking platform built with Next.js 15, React 19, and TypeScript.

## Tech Stack

- **Next.js 15** (App Router, Turbopack)
- **React 19**
- **TypeScript 5**
- **Redux Toolkit** - Global state management
- **Apollo Client** - GraphQL data fetching
- **Tailwind CSS 4**

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

We follow the [Bulletproof React](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md) project structure:

```
src/
├── app/           # Next.js routes and providers
├── features/      # Feature modules (auth, flight, hotel, service-selector)
│   └── feature/
│       ├── api/        # GraphQL queries/mutations
│       ├── components/ # Feature-specific UI
│       ├── hooks/      # Feature-specific hooks
│       ├── stores/     # Redux slices
│       └── types/      # Feature types
├── components/    # Shared/reusable UI components
├── hooks/         # Shared custom hooks
├── lib/           # Utilities, Apollo client
├── stores/        # Redux store configuration
├── types/         # GraphQL-generated types + global types
└── config/        # Constants and configuration
```

## Environment Variables

```env
NEXT_PUBLIC_GRAPHQL_URI=http://localhost:8080/graphql
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
```

## Scripts

| Script             | Description                     |
| ------------------ | ------------------------------- |
| `npm run dev`      | Start dev server with Turbopack |
| `npm run build`    | Production build                |
| `npm run lint`     | Run ESLint                      |
| `npm run lint:fix` | Fix ESLint issues               |
| `npm run format`   | Format with Prettier            |
| `npm run test`     | Run Vitest tests                |
| `npm run codegen`  | Generate GraphQL types          |

## Git Workflow

- Main branch: `main`
- Development branch: `dev`
- Feature branches: `PLFS-XX-description`
- Conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`
