import fastify, { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';
import { PrismaUnitOfWork } from '../persistence/postgres/PrismaUnitOfWork';
import { NodemailerNotificationService } from '../services/NodemailerNotificationService';
import { ConsoleNotificationService } from '../services/ConsoleNotificationService';
import { IUnitOfWork } from '../../core/application/interfaces/IUnitOfWork';
import { INotificationService } from '../../core/application/interfaces/INotificationService';
import { ScooterController } from './controllers/ScooterController';

// Load environment variables
dotenv.config();

/**
 * Creates a Fastify server
 * @returns The Fastify server
 */
export const createServer = (): FastifyInstance => {
  // Create Fastify app
  const app = fastify({
    logger: true
  });

  // Register plugins
  app.register(fastifyCors);

  // Create dependencies
  const unitOfWork: IUnitOfWork = new PrismaUnitOfWork();

  // Choose notification service based on environment
  const isDevelopment = process.env.NODE_ENV === 'development';
  const notificationService: INotificationService = isDevelopment
    ? new ConsoleNotificationService()
    : new NodemailerNotificationService();

  // Create controllers
  const scooterController = new ScooterController(unitOfWork, notificationService);

  // Register routes
  registerRoutes(app, scooterController);

  // Health check endpoint
  app.get('/health', async (request, reply) => {
    return { status: 'ok' };
  });

  // Error handler
  app.setErrorHandler((error, request, reply) => {
    app.log.error(error);
    reply.status(500).send({
      message: 'Une erreur est survenue',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur interne du serveur'
    });
  });

  return app;
};

/**
 * Registers routes
 * @param app The Fastify app
 * @param scooterController The scooter controller
 */
const registerRoutes = (
  app: FastifyInstance,
  scooterController: ScooterController
): void => {
  // Scooter routes
  app.get('/api/scooters', scooterController.getAllScooters);
  app.get('/api/scooters/:id', scooterController.getScooterById);
  app.post('/api/scooters', scooterController.createScooter);
  app.put('/api/scooters/:id', scooterController.updateScooter);
  app.delete('/api/scooters/:id', scooterController.deleteScooter);
};

/**
 * Starts the server
 */
export const startServer = async (): Promise<void> => {
  const app = createServer();
  const PORT = process.env.PORT || 3000;

  try {
    await app.listen({ port: Number(PORT), host: '0.0.0.0' });
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

// Start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  startServer();
}
