# BridgeGas Landing Page - Project Dependencies

This document lists all libraries and frameworks used in this project. For actual installation, use `npm install` since dependencies are managed in `package.json`.

## Core Technology Stack

### Frontend Framework
- **React 18.3.1** - Modern UI library for building interactive interfaces
- **TypeScript 5.6.3** - Type safety and enhanced development experience
- **Vite 5.4.19** - Fast development server and build tool

### Backend Framework
- **Express.js 4.21.2** - Node.js web framework for API endpoints
- **Node.js** - JavaScript runtime environment

### Database & Data Management
- **Drizzle ORM 0.39.1** - Type-safe database operations
- **Neon Serverless 0.10.4** - PostgreSQL serverless driver
- **Zod 3.24.2** - Schema validation and type safety

## UI Component Library

### Radix UI Primitives (Complete Set)
All components use Radix UI for accessibility and consistent behavior:
- Accordion, Alert Dialog, Avatar, Checkbox, Dialog
- Dropdown Menu, Navigation Menu, Popover, Select
- Tabs, Toast, Tooltip, and many more

### Styling & Design System
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - Pre-built components using Radix UI + Tailwind
- **Framer Motion 11.13.1** - Smooth animations and transitions
- **Lucide React 0.453.0** - Modern icon library

## State Management & Forms
- **TanStack React Query 5.60.5** - Server state management and caching
- **React Hook Form 7.55.0** - Efficient form handling
- **Zod Validation** - Type-safe form validation

## Routing & Navigation
- **Wouter 3.3.5** - Lightweight React routing library

## Authentication & Session Management
- **Express Session 1.18.1** - Session middleware
- **Passport.js 0.7.0** - Authentication strategies
- **PostgreSQL Session Store** - Persistent session storage

## Development Tools
- **TypeScript** - Complete type definitions for all packages
- **ESBuild 0.25.0** - Fast JavaScript bundler
- **PostCSS & Autoprefixer** - CSS processing
- **Drizzle Kit** - Database migrations and schema management

## Installation & Usage

```bash
# Install all dependencies
npm install

# Start development server
npm run dev

# Build for production  
npm run build

# Start production server
npm start

# Database operations
npm run db:push
```

## Project Architecture

This is a full-stack TypeScript application with:
- **Frontend**: React with Vite, using shadcn/ui components
- **Backend**: Express.js API with in-memory storage
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with dark luxury theme
- **Animations**: Framer Motion for smooth interactions
- **Forms**: React Hook Form with Zod validation

## Key Features Enabled by Dependencies

1. **Premium UI Components** - Radix UI primitives ensure accessibility
2. **Dark Luxury Theme** - Tailwind CSS with custom variables
3. **Smooth Animations** - Framer Motion for professional feel
4. **Type Safety** - TypeScript + Zod throughout the stack
5. **Form Validation** - React Hook Form + Zod schemas
6. **Email Whitelist** - PostgreSQL storage with validation
7. **Content Management** - API endpoints for editable content
8. **Responsive Design** - Tailwind CSS responsive utilities

All dependencies are production-ready and actively maintained, chosen for enterprise-grade reliability and developer experience.