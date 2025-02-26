import { Router } from 'express';
import { MaintenanceController } from '../controllers/MaintenanceController';

const router = Router();

// Get all maintenances
router.get('/', MaintenanceController.getAll);

// Get maintenance by ID
router.get('/:id', MaintenanceController.getById);

// Add a new maintenance
router.post('/', MaintenanceController.add);

// Update a maintenance by ID
router.put('/:id', MaintenanceController.update);

// Delete a maintenance by ID
router.delete('/:id', MaintenanceController.delete);

export default router;
