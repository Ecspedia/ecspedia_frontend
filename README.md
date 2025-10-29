# Ecspedia - Travel Booking Platform

A modern travel booking platform built with Next.js 15, React 19, and Redux Toolkit. Search and book flights, hotels, and more with an intuitive user interface.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Architecture](#architecture)
- [Development Guidelines](#development-guidelines)
- [Contributing](#contributing)
- [License](#license)

## Overview

Ecspedia is a comprehensive travel booking application that allows users to search for and book various travel services including flights, hotel accommodations, car rentals, vacation packages, activities, and cruises. The platform features a clean, responsive design with real-time search capabilities.

## Features

- **Multi-Service Search**: Search across flights, hotels, cars, packages, activities, and cruises
- **Interactive Forms**: Dynamic location autocomplete and date range selection
- **Real-Time Results**: Live search results with loading states and error handling
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **State Management**: Centralized state management with Redux Toolkit
- **Type Safety**: Full TypeScript implementation for robust code
- **Modern UI**: Clean interface with Heroicons and Lucide icons

## Tech Stack

### Core
- **[Next.js 15.5.4](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety

### State Management
- **[Redux Toolkit 2.9.0](https://redux-toolkit.js.org/)** - State management
- **[React Redux 9.2.0](https://react-redux.js.org/)** - React bindings for Redux

### Styling
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[PostCSS](https://postcss.org/)** - CSS transformations

### Forms & Validation
- **[React Hook Form 7.65.0](https://react-hook-form.com/)** - Form validation and management

### HTTP Client
- **[Axios 1.12.2](https://axios-http.com/)** - Promise-based HTTP client

### Icons
- **[Heroicons 2.2.0](https://heroicons.com/)** - Beautiful hand-crafted SVG icons
- **[Lucide React 0.545.0](https://lucide.dev/)** - Icon library

### Development Tools
- **[ESLint 9](https://eslint.org/)** - Code linting
- **[Prettier 3.6.2](https://prettier.io/)** - Code formatting
- **Turbopack** - Fast bundler (Next.js built-in)

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd grupo3softservefront
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
grupo3softservefront/
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── Login/            # Login page
│   │   ├── Soporte/          # Support page
│   │   ├── Viajes/           # Trips page
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   ├── globals.css       # Global styles
│   │   └── storeProvider.tsx # Redux store provider
│   ├── components/           # React components
│   │   ├── features/        # Feature-specific components
│   │   │   ├── flight/      # Flight search components
│   │   │   ├── hotel/       # Hotel search components
│   │   │   ├── google-maps-hotels/ # Map integration
│   │   │   └── service-navigation/  # Tab navigation
│   │   ├── shared/          # Shared/reusable components
│   │   │   ├── DateRangeTextField.tsx
│   │   │   ├── LocationTextField.tsx
│   │   │   └── ExpandedLocationTextField.tsx
│   │   └── ui/              # Base UI components
│   │       ├── Button.tsx
│   │       ├── TextField.tsx
│   │       ├── SimpleCalendar.tsx
│   │       ├── DateRangeCalendar.tsx
│   │       └── Header/      # Header components
│   ├── constants/           # App constants
│   │   ├── services.ts      # Service definitions
│   │   ├── variants.ts      # Component variants
│   │   ├── mockFlights.ts   # Mock data
│   │   └── defaultCitySuggestion.ts
│   ├── libs/                # State management
│   │   ├── store.ts         # Redux store configuration
│   │   ├── hooks.ts         # Redux hooks (useAppDispatch, useAppSelector)
│   │   └── features/        # Redux slices
│   │       ├── flight/      # Flight search slice
│   │       ├── hotel/       # Hotel search slice
│   │       └── service-navigation/ # Navigation slice
│   ├── services/            # API services
│   │   └── hotelService.ts  # Hotel API calls
│   └── types/               # TypeScript types
│       ├── services.ts      # Service types
│       └── citySuggestion.ts # City types
├── .env.example             # Environment variables template
├── .prettierrc              # Prettier configuration
├── eslint.config.mjs        # ESLint configuration
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration (if exists)
└── package.json             # Dependencies and scripts
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `http://localhost:8080/api` |

**Note**: All variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Architecture

### State Management

The application uses **Redux Toolkit** for centralized state management with the following slices:

- **serviceTabSlice**: Manages active service tab (Flights, Hotels, etc.)
- **flightSearchSlice**: Handles flight search parameters and results
- **hotelSearchSlice**: Manages hotel search state, results, loading, and errors

### Component Patterns

1. **Feature-based organization**: Components grouped by feature/domain
2. **Separation of concerns**: UI, business logic, and API calls are separated
3. **Type-safe props**: All components use TypeScript interfaces
4. **Controlled components**: Forms use React Hook Form for validation

### API Layer

- API calls are centralized in the `services/` directory
- Uses Axios for HTTP requests
- Error handling with try-catch and typed error responses
- Base URL configured via environment variables

### Routing

Next.js App Router structure:
- `/` - Home page (search interface)
- `/Login` - User authentication
- `/Soporte` - Support/help page
- `/Viajes` - User trips/bookings

## Development Guidelines

### Code Style

- Use **TypeScript** for all new files
- Follow **functional components** with hooks
- Use **named exports** for utilities, **default exports** for components
- Keep components **small and focused** (Single Responsibility Principle)
- Use **meaningful variable names**

### Naming Conventions

- **Components**: PascalCase (`HotelCard.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Functions/Variables**: camelCase (`handleSubmit`, `userName`)
- **Types/Interfaces**: PascalCase (`HotelSearchState`, `ButtonProps`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Enums**: PascalCase (`ServiceType`)

### Component Structure

```typescript
// 1. Imports
import { useState } from 'react';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
  onClick: () => void;
}

// 3. Component
export default function Component({ title, onClick }: ComponentProps) {
  // 4. Hooks
  const [state, setState] = useState('');

  // 5. Event handlers
  const handleClick = () => {
    // handler logic
  };

  // 6. Render
  return (
    <div>{title}</div>
  );
}
```

### Git Workflow

1. Create a feature branch from `dev`:
   ```bash
   git checkout -b PLFS-XX-feature-description
   ```

2. Make your changes and commit with descriptive messages:
   ```bash
   git commit -m "feat: add hotel search filters"
   ```

3. Push and create a pull request to `dev`

### Commit Message Convention

Follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `style:` - Formatting, missing semicolons, etc.
- `docs:` - Documentation changes
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Before submitting a PR:

- [ ] Run `npm run lint` and fix any errors
- [ ] Ensure code is properly formatted (Prettier)
- [ ] Test your changes locally
- [ ] Update documentation if needed
- [ ] Write clear PR description

## Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Next.js GitHub](https://github.com/vercel/next.js) - Next.js repository

### Related Documentation
- [React Documentation](https://react.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Other Platforms

The application can also be deployed to:
- AWS (Amplify, EC2, ECS)
- Google Cloud Platform
- Azure
- Netlify
- Docker containers

## License

This project is private and confidential.

---

**Built with ❤️ by the Grupo 3 Softserve Team**
