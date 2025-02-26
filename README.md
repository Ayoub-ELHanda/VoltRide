# VoltRide

VoltRide is an electric scooter management platform built with TypeScript, following Clean Architecture principles.

## Project Structure

This project is organized as a monorepo with the following structure:

```
voltride/
├── backend/           # Backend service
│   ├── src/           # Source code
│   │   ├── core/      # Core business logic (framework-independent)
│   │   └── frameworks/# Framework implementations
│   ├── prisma/        # Database schemas and migrations
│   └── ...
├── frontend/          # Frontend application (to be added)
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- MongoDB (optional)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

#### Local Development

```bash
# Development mode
npm run dev

# Production mode
npm start
```

#### Using Docker

```bash
# Start all services
npm run docker:up

# Build and start all services
npm run docker:build && npm run docker:up

# View logs
npm run docker:logs

# Stop all services
npm run docker:down
```

The application will be available at:
- Backend API: http://localhost:3000
- PostgreSQL Admin: http://localhost:5050 (email: admin@voltride.com, password: admin)
- MongoDB Admin: http://localhost:8081 (username: admin, password: admin)

## Backend Architecture

The backend follows Clean Architecture principles with clear separation of concerns:

- **Domain Layer**: Contains business entities and repository interfaces
- **Application Layer**: Contains use cases, DTOs, and service interfaces
- **Frameworks Layer**: Contains implementations for databases, services, and web frameworks

For more details, see the [backend README](./backend/README.md).

## Features

- Scooter management (inventory, status tracking)
- Maintenance management (preventive and corrective)
- Parts inventory management
- Notification system (email, SMS)
- Multi-framework support (Express, Fastify)
- Multi-database support (PostgreSQL, MongoDB, In-Memory)

## License

