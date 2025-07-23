# Overview

This is a full-stack web application featuring an interactive 3D artist portfolio for "Gyakie" (a musician). The application combines a React Three.js frontend with an Express.js backend, using PostgreSQL for data persistence and a modern UI built with shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built with React and TypeScript, featuring:
- **3D Scene Management**: React Three Fiber for WebGL rendering with interactive 3D elements
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **State Management**: Zustand stores for scene, audio, and game state
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for development and bundling

### Backend Architecture
The backend follows a minimalist Express.js pattern:
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Storage Interface**: Abstracted storage layer with in-memory fallback
- **Development**: Hot reloading with Vite integration

## Key Components

### 3D Scene System
- **Scene Manager**: Central 3D scene with orbital camera controls
- **Interactive Elements**: Clickable planets representing different portfolio sections
- **Animation System**: Character animations, bird movements, and dynamic lighting
- **Audio Integration**: Spatial audio with background music and sound effects

### Portfolio Sections
- **Music**: Album displays with playback controls
- **Images**: Photo gallery with lightbox functionality
- **Tours**: Concert listings with booking status
- **Shop**: E-commerce interface for merchandise
- **About**: Artist biography and achievements

### UI Components
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Design System**: Consistent theming with HSL color variables
- **Interactive Elements**: Hover states, transitions, and micro-interactions
- **Navigation**: Section-aware navigation with universe overview

## Data Flow

### State Management
- **Scene State**: Animation phases, current section, loading states
- **Audio State**: Background music, sound effects, mute controls
- **User Interactions**: Planet selection, section navigation, media controls

### Database Schema
- **Users Table**: Basic user authentication structure with username/password
- **Extensible Design**: Schema ready for additional content types

### Client-Server Communication
- **API Layer**: RESTful endpoints with standardized error handling
- **Query Management**: TanStack Query for data fetching and caching
- **Session Handling**: Cookie-based session management

## External Dependencies

### 3D Graphics
- **Three.js Ecosystem**: Core 3D rendering, post-processing effects, additional utilities
- **GLTF Support**: 3D model loading for characters and environments
- **Shader Support**: GLSL shader compilation through Vite plugin

### UI Libraries
- **Radix UI**: Accessible component primitives for complex interactions
- **Lucide Icons**: Comprehensive icon system
- **Date Handling**: date-fns for temporal operations

### Audio Support
- **Web Audio API**: Native browser audio handling
- **Multiple Formats**: MP3, OGG, WAV support for cross-browser compatibility

## Deployment Strategy

### Build Process
- **Client Build**: Vite bundles React app to static assets
- **Server Build**: ESBuild compiles Node.js server for production
- **Asset Pipeline**: Support for large 3D models and audio files

### Database Configuration
- **Neon Database**: Serverless PostgreSQL with connection pooling
- **Migration System**: Drizzle Kit for schema migrations
- **Environment Variables**: Secure database URL configuration

### Production Optimizations
- **Code Splitting**: Automatic route-based code splitting
- **Asset Optimization**: Image and audio file compression
- **Caching Strategy**: Query caching and asset fingerprinting

The architecture prioritizes developer experience with hot reloading, type safety, and modular component design while maintaining performance through optimized 3D rendering and efficient data fetching patterns.