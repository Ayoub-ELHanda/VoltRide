# VoltRide Backend

Backend service for VoltRide, an electric scooter management platform.

## Architecture

This project follows Clean Architecture principles to ensure separation of concerns and independence from frameworks. The architecture is divided into the following layers:

### Core Layer

- **Domain**: Contains business entities and business rules.
  - Entities: Scooter, ScooterModel, Maintenance, Notification, etc.
  - Repository interfaces: Define how to access data without specifying implementation details.

- **Application**: Contains application-specific business rules.
  - Use Cases: Implement specific business operations.
  - DTOs: Data Transfer Objects for passing data between layers.
  - Interfaces: Define contracts for services and repositories.

### Frameworks Layer

- **Persistence**: Contains database implementations.
  - PostgreSQL (via Prisma): For main data storage.
  - MongoDB: For historical data and logs.
  - In-Memory: For testing purposes.

- **Services**: Contains external service implementations.
  - Notification services (Email, SMS, Push).

- **Web Frameworks**: Contains web framework implementations.
  - Express: REST API implementation.
  - Fastify: Alternative REST API implementation.

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
3. Copy the environment variables file:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your configuration.
5. Generate Prisma client for PostgreSQL:
   ```bash
   npm run prisma:generate:postgres
   ```
6. Run database migrations:
   ```bash
   npm run prisma:migrate:postgres init
   ```

### Running the Application

#### Development Mode

```bash
# Using Express (default)
npm run dev

# Using Express (explicit)
npm run dev:express

# Using Fastify
npm run dev:fastify
```

#### Production Mode

```bash
# Build the application
npm run build

# Start the application
npm start
```

#### Docker Mode

The backend can be run as part of the Docker Compose setup from the root directory:

```bash
# From the root directory
npm run docker:up
```

This will start the backend along with PostgreSQL and MongoDB databases, as well as admin interfaces for both databases.

## Project Structure

```
src/
├── core/                  # Core layer (framework-independent)
│   ├── domain/            # Domain layer
│   │   ├── entities/      # Business entities
│   │   └── repositories/  # Repository interfaces
│   └── application/       # Application layer
│       ├── dtos/          # Data Transfer Objects
│       ├── interfaces/    # Service interfaces
│       └── use-cases/     # Business use cases
├── frameworks/            # Frameworks layer (framework-dependent)
│   ├── persistence/       # Database implementations
│   │   ├── postgres/      # PostgreSQL implementation
│   │   └── in-memory/     # In-memory implementation
│   ├── services/          # Service implementations
│   ├── express/           # Express implementation
│   └── fastify/           # Fastify implementation
└── main.ts                # Application entry point
```

## Framework Independence

The application is designed to be framework-independent. The core business logic is isolated from the frameworks used for web, database, and external services. This allows for:

1. Easy switching between frameworks (e.g., Express to Fastify)
2. Multiple database support (PostgreSQL, MongoDB, In-Memory)
3. Simplified testing with in-memory implementations

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## License

This project is licensed under the MIT License.
