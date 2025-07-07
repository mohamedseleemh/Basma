# replit.md

## Overview

This is a full-stack React application built with Express.js backend, featuring a professional service booking platform called "VIB" (Very Important Bookings). The application is designed for a luxury booking service specializing in Nile cruises, nightlife, and premium experiences in Egypt. It includes a modern frontend with premium animations and a backend API with database integration.

## System Architecture

### Frontend Architecture

- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS with shadcn/ui components
- **State Management**: React Query for server state, Context API for auth
- **Routing**: React Router DOM
- **Build Tool**: Vite with custom configuration
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: CSS animations with custom morphing backgrounds and floating elements

### Backend Architecture

- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: connect-pg-simple for PostgreSQL sessions
- **Development**: Hot module replacement with Vite middleware
- **API Structure**: RESTful endpoints with `/api` prefix

### Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   │   ├── admin/   # Admin panel components
│   │   │   │   ├── AdminBookings.tsx  # Booking management
│   │   │   │   ├── AdminServices.tsx  # Service management
│   │   │   │   ├── AdminTestimonials.tsx  # Testimonial management
│   │   │   │   ├── AdminGallery.tsx   # Gallery management
│   │   │   │   └── AdminSettings.tsx  # Settings management
│   │   │   ├── Booking.tsx    # Booking form component
│   │   │   ├── About.tsx      # About page component
│   │   │   ├── Pricing.tsx    # Pricing page component
│   │   │   ├── FAQ.tsx        # FAQ page component
│   │   │   └── Navigation.tsx # Main navigation component
│   │   ├── pages/       # Route components
│   │   │   ├── BookingPage.tsx  # Booking page
│   │   │   ├── AboutPage.tsx    # About page
│   │   │   ├── PricingPage.tsx  # Pricing page
│   │   │   └── FAQPage.tsx      # FAQ page
│   │   ├── hooks/       # Custom React hooks
│   │   ├── contexts/    # React context providers
│   │   └── lib/         # Utility functions
├── server/          # Express backend
│   ├── db.ts        # Database connection
│   ├── routes.ts    # API route definitions (includes booking endpoints)
│   ├── storage.ts   # Data access layer (includes booking operations)
│   └── vite.ts      # Development server setup
├── shared/          # Shared types and schemas
│   └── schema.ts    # Database schema definitions (includes bookings table)
```

## Key Components

### Frontend Components

- **Header**: Landing page hero section with profile, animations, and call-to-action
- **Services**: Service cards showcasing booking options with hover effects
- **Testimonials**: Customer reviews carousel with auto-rotation
- **Gallery**: Image gallery with modal viewer
- **Contact**: Contact form with WhatsApp integration
- **Admin Panel**: Full CRUD interface for managing content
- **Navigation**: Main navigation with routing to all pages
- **Booking**: Comprehensive booking form with validation
- **About**: Company information and values page
- **Pricing**: Service packages with detailed pricing
- **FAQ**: Frequently asked questions with collapsible answers

### Backend Components

- **Database Layer**: Drizzle ORM with PostgreSQL schema
- **Storage Interface**: Abstraction layer for data operations
- **Route Handler**: Express route registration system
- **Development Server**: Vite integration for hot reloading
- **Booking API**: RESTful endpoints for booking management

## Data Flow

### Frontend Data Flow

1. React components fetch data using React Query
2. Auth context manages user authentication state
3. API calls made through custom hooks
4. Component state updates trigger re-renders
5. Form submissions send data to backend API

### Backend Data Flow

1. Express routes receive HTTP requests
2. Route handlers validate and process requests
3. Storage layer interacts with database via Drizzle ORM
4. Database responses flow back through storage to routes
5. JSON responses sent to frontend

## External Dependencies

### Frontend Dependencies

- **UI Library**: Radix UI primitives for accessible components
- **Styling**: TailwindCSS for utility-first CSS
- **State Management**: TanStack React Query for server state
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React icon library
- **Animations**: Custom CSS animations and transitions

### Backend Dependencies

- **Database**: Neon PostgreSQL serverless database
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Store**: connect-pg-simple for PostgreSQL sessions
- **WebSocket**: ws library for Neon WebSocket connections
- **Development**: tsx for TypeScript execution

### Build Tools

- **Bundler**: Vite for fast development and optimized production builds
- **TypeScript**: Full TypeScript support across frontend and backend
- **ESBuild**: For server-side bundling in production

## Deployment Strategy

### Development Environment

- Vite dev server with HMR for frontend
- tsx for running TypeScript server code
- Concurrent development of frontend and backend
- Replit-specific plugins for cartographer and error handling

### Production Build

- Frontend: Vite build to `dist/public` directory
- Backend: ESBuild bundle to `dist/index.js`
- Static file serving through Express
- Environment variables for database configuration

### Database Management

- Drizzle migrations in `migrations/` directory
- Schema defined in `shared/schema.ts`
- Push schema changes with `npm run db:push`
- PostgreSQL connection via environment variable

## Changelog

```
Changelog:
- July 07, 2025. Initial setup and migration from Lovable to Replit
- July 07, 2025. Enhanced project with full Arabic language support
  - Added comprehensive booking system with form validation
  - Created About page with company information and values
  - Added Pricing page with service packages and FAQ
  - Implemented FAQ page with collapsible questions
  - Added Navigation component with proper routing
  - Enhanced database schema with bookings table
  - Created booking management API endpoints
  - Added AdminBookings component for reservation management
  - Improved admin panel with booking management capabilities
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```
