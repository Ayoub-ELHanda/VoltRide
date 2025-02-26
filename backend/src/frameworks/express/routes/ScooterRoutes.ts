import { Router } from 'express';
import { ScooterController } from '../controllers/ScooterController';
import { IUnitOfWork } from '../../../core/application/interfaces/IUnitOfWork';
import { INotificationService } from '../../../core/application/interfaces/INotificationService';

/**
 * Creates the scooter routes
 * @param unitOfWork The unit of work
 * @param notificationService The notification service
 * @returns The router
 */
export const createScooterRoutes = (
  unitOfWork: IUnitOfWork,
  notificationService: INotificationService
): Router => {
  const router = Router();
  const scooterController = new ScooterController(unitOfWork, notificationService);

  /**
   * @route GET /api/scooters
   * @desc Get all scooters
   * @access Public
   */
  router.get('/', (req, res) => scooterController.getAllScooters(req, res));

  /**
   * @route GET /api/scooters/:id
   * @desc Get a scooter by ID
   * @access Public
   */
  router.get('/:id', (req, res) => scooterController.getScooterById(req, res));

  /**
   * @route POST /api/scooters
   * @desc Create a new scooter
   * @access Public
   */
  router.post('/', (req, res) => scooterController.createScooter(req, res));

  /**
   * @route PUT /api/scooters/:id
   * @desc Update a scooter
   * @access Public
   */
  router.put('/:id', (req, res) => scooterController.updateScooter(req, res));

  /**
   * @route DELETE /api/scooters/:id
   * @desc Delete a scooter
   * @access Public
   */
  router.delete('/:id', (req, res) => scooterController.deleteScooter(req, res));

  return router;
};
