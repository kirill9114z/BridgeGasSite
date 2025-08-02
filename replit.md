# Overview

BridgeGas is a cutting-edge B2B crypto startup building a single-page marketing website to capture interested companies for their whitelist. The application is a full-stack TypeScript application featuring a React frontend with a modern design system, an Express.js backend API, and PostgreSQL database integration. The website showcases BridgeGas's crypto payment solutions, bridging services, and enterprise compliance offerings through a luxurious, dark-themed design with smooth scroll animations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, professional design
- **UI Components**: Comprehensive set of Radix UI primitives wrapped in custom components
- **Animations**: Framer Motion for smooth scroll effects and micro-interactions
- **State Management**: TanStack React Query for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Routing**: Wouter for lightweight client-side routing

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Error Handling**: Centralized error middleware with structured error responses
- **Logging**: Custom request/response logging for API endpoints
- **Development**: Hot reload with tsx and Vite integration

## Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Shared schema definitions between client and server
- **Migrations**: Drizzle Kit for database schema migrations
- **Validation**: Zod schemas for runtime type validation and database inserts

## Authentication and Authorization
- **Session Management**: PostgreSQL-based session storage using connect-pg-simple
- **Security**: No complex authentication - simple email collection for whitelist

## External Dependencies
- **Database Provider**: Neon serverless PostgreSQL
- **UI Components**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with custom color variables for dark theme
- **Form Validation**: Zod for schema validation
- **HTTP Client**: Built-in fetch API with custom wrapper functions
- **Development Tools**: TypeScript, ESBuild, PostCSS, and Autoprefixer

The application follows a monorepo structure with shared TypeScript definitions, enabling type safety across the full stack. The design emphasizes a luxurious, enterprise-grade appearance with dark themes, professional typography, and subtle animations to build trust with potential B2B clients.