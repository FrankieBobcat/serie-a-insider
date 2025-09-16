# Serie A Insider

## Overview

Serie A Insider is a comprehensive web application dedicated to Italian football (Serie A). It serves as a complete platform for fans to access the latest Serie A news, team information, match results, merchandise, and multimedia content. The application provides features including news articles, team profiles, an e-commerce shop, video highlights, fan engagement tools (quizzes, newsletters), and PWA capabilities for mobile users.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Context API for cart management, TanStack Query for server state
- **Styling**: Tailwind CSS with custom Serie A branding colors and themes, Radix UI components for consistent design system
- **PWA Features**: Service worker implementation, manifest file, and mobile-first design with pull-to-refresh functionality
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture  
- **Framework**: Express.js with TypeScript for API endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: Built-in session handling for user authentication
- **API Design**: RESTful endpoints with consistent error handling and request/response logging
- **File Structure**: Modular separation between routes, storage layer, and database configuration

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted via Neon Database serverless platform
- **ORM**: Drizzle with schema-first approach, supporting migrations and type generation
- **Schema Design**: Separate tables for users, newsletter subscribers, quiz submissions, and contact messages
- **Local Storage**: Browser localStorage for cart persistence and user preferences

### Authentication and Authorization
- **Current Implementation**: Basic user schema prepared for future authentication features
- **Session Storage**: Express session configuration ready for implementation
- **Security**: Prepared infrastructure for secure password handling and user management

### External Service Integrations
- **Payment Processing**: Stripe integration for e-commerce functionality with React Stripe.js components
- **Email Service**: SendGrid configured for newsletter and transactional emails
- **Font Loading**: Google Fonts integration for typography (Montserrat, Open Sans, Roboto Condensed)
- **Social Sharing**: Built-in social media sharing components for content distribution

## External Dependencies

- **Database**: Neon Database (PostgreSQL serverless)
- **Payment Gateway**: Stripe for payment processing
- **Email Service**: SendGrid for newsletter and email communications  
- **CDN/Assets**: Unsplash for placeholder images, Wikipedia for team logos
- **Development Tools**: Vite for build tooling, ESBuild for production builds
- **UI Components**: Radix UI component library for accessible design system
- **External APIs**: Prepared for sports data integration (currently using mock data)