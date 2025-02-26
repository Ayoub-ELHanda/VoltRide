import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createScooterRoutes } from './routes/ScooterRoutes';
import { PrismaUnitOfWork } from '../persistence/postgres/PrismaUnitOfWork';
import { NodemailerNotificationService } from '../services/NodemailerNotificationService';
import { ConsoleNotificationService } from '../services/ConsoleNotificationService';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Create dependencies
const unitOfWork = new PrismaUnitOfWork();

// Choose notification service based on environment
const isDevelopment = process.env.NODE_ENV === 'development';
const notificationService = isDevelopment
  ? new ConsoleNotificationService()
  : new NodemailerNotificationService();

// Routes
app.use('/api/scooters', createScooterRoutes(unitOfWork, notificationService));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Une erreur est survenue',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Erreur interne du serveur'
  });
});

/**
 * Starts the server
 */
export const startServer = (): void => {
  app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
};

// For testing purposes
export default app;
