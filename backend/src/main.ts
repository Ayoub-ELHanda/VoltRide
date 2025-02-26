import dotenv from 'dotenv';
import expressServer, { startServer as startExpressServer } from './frameworks/express/server';
import { startServer as startFastifyServer } from './frameworks/fastify/server';

// Load environment variables
dotenv.config();

/**
 * Main entry point for the application
 * Starts the server based on the FRAMEWORK environment variable
 */
const main = async (): Promise<void> => {
  // Get the framework from the environment variables
  const framework = process.env.FRAMEWORK || 'express';

  // Start the server based on the framework
  switch (framework.toLowerCase()) {
    case 'express':
      console.log('Starting Express server...');
      startExpressServer();
      break;
    case 'fastify':
      console.log('Starting Fastify server...');
      await startFastifyServer();
      break;
    default:
      console.error(`Unknown framework: ${framework}`);
      console.log('Defaulting to Express server...');
      startExpressServer();
      break;
  }
};

// Run the main function
if (process.env.NODE_ENV !== 'test') {
  main().catch((error) => {
    console.error('Error starting server:', error);
    process.exit(1);
  });
}
