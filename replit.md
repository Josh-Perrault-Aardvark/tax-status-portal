# Tax Year Summary Viewer

## Overview

A single-page web application for parsing and displaying tax year summaries from Assembly custom field JSON data. The application accepts JSON input containing tax ticket information and displays an organized table view of tax years with their status and last updated information. Built with a Material Design-inspired interface optimized for data clarity and professional presentation of financial information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript, using Vite as the build tool and development server.

**UI Component System**: Shadcn/ui (New York style variant) built on Radix UI primitives. This provides a comprehensive set of accessible, composable components with Tailwind CSS styling. The component library emphasizes:
- Material Design principles adapted for modern web applications
- Data-dense layouts with clear visual hierarchy
- Professional aesthetic suitable for financial data presentation
- Comprehensive form controls and table components

**Styling Approach**: Tailwind CSS with custom CSS variables for theming. Supports light/dark mode through CSS class toggling. Design tokens are defined in `client/src/index.css` with HSL color values for flexible theming.

**Routing**: Wouter for lightweight client-side routing. Currently implements a simple two-route structure (home page and 404 handler).

**State Management**: React Query (@tanstack/react-query) for server state management. Currently configured with:
- No automatic refetching (staleTime: Infinity)
- Custom query functions for API communication
- Error handling with 401 unauthorized behavior options

**Type Safety**: Full TypeScript implementation with strict mode enabled. Shared types between frontend and backend via `shared/schema.ts`.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with ESM module system.

**API Structure**: RESTful API with `/api` prefix for all application routes. Server includes:
- Request/response logging middleware with JSON body capture
- CORS and security headers configuration
- Development-specific tooling (Vite integration, error overlays)
- Production build supports static file serving

**Storage Layer**: Abstract storage interface (`IStorage`) with in-memory implementation (`MemStorage`). Designed to be swappable with database-backed implementations. Current implementation includes:
- User CRUD operations
- UUID-based primary keys
- Username-based lookups

**Development Server**: Integrated Vite development server in middleware mode for HMR (Hot Module Replacement) and fast refresh during development.

**Production Build**: Uses esbuild to bundle the server code separately from the Vite-built client assets.

### Data Architecture

**Database Schema**: Drizzle ORM configured for PostgreSQL with schema defined in `shared/schema.ts`. Current schema includes:
- Users table with UUID primary keys
- Zod validation schemas for type-safe inserts
- Database migrations managed via Drizzle Kit

**Tax Data Types**: Client-side TypeScript interfaces for Assembly ticket data:
- `AssemblyTicket`: Raw ticket data with tax_year, status_label, stage_raw, and updated_iso fields
- `TaxYearSummary`: Transformed data structure with taxYear, status, and lastUpdatedIso

**Data Transformation**: Client-side parsing logic (`summarizeByYear` function) that:
- Validates JSON input format
- Groups tickets by tax year
- Selects most recent ticket per year based on timestamp
- Maps status fields with fallback logic

### Design System

**Typography**: Inter font family (via Google Fonts CDN) with defined hierarchy:
- Page titles: 32px/700 weight
- Section headers: 20px/600 weight  
- Body text: 15px/400 weight
- Monospace font for JSON input display

**Layout System**: Tailwind spacing units (2, 4, 6, 8, 12) with:
- Max-width container (max-w-5xl)
- Single-column layout
- Centered content with horizontal padding
- Consistent component padding (p-6 or p-8)

**Component Patterns**:
- Card-based content sections
- Table components for data display
- Toast notifications for user feedback
- Alert components for error states
- Theme toggle for light/dark mode switching

## External Dependencies

### Frontend Libraries

- **@radix-ui/**: Headless UI component primitives (dialogs, dropdowns, tooltips, etc.)
- **@tanstack/react-query**: Server state management and data fetching
- **wouter**: Lightweight client-side routing
- **react-hook-form** + **@hookform/resolvers**: Form state management with validation
- **zod**: Runtime type validation and schema definition
- **date-fns**: Date formatting and manipulation
- **lucide-react**: Icon library
- **class-variance-authority**: Variant-based component styling
- **tailwind-merge** + **clsx**: Utility for merging Tailwind classes

### Backend Libraries

- **express**: HTTP server framework
- **drizzle-orm**: TypeScript ORM for database operations
- **drizzle-zod**: Zod schema generation from Drizzle schemas
- **@neondatabase/serverless**: PostgreSQL driver for Neon serverless databases
- **connect-pg-simple**: PostgreSQL session store (available but not currently active)

### Development Tools

- **vite**: Build tool and development server
- **@vitejs/plugin-react**: React Fast Refresh support
- **typescript**: Type checking and compilation
- **tailwindcss**: Utility-first CSS framework
- **postcss** + **autoprefixer**: CSS processing
- **tsx**: TypeScript execution for development
- **esbuild**: Production server bundling
- **drizzle-kit**: Database migration management

### Database

- **PostgreSQL**: Relational database (via Neon serverless or compatible provider)
- Connection managed through `DATABASE_URL` environment variable
- Schema migrations stored in `/migrations` directory

### Replit-Specific Integrations

- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Code navigation tooling
- **@replit/vite-plugin-dev-banner**: Development environment indicator