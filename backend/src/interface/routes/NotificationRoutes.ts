import { Router } from 'express';
import { NotificationController } from '../controllers/NotificationController';

const router = Router();

// Get all notifications
router.get('/', NotificationController.getAll);

// Create a new notification
router.post('/', NotificationController.create);

// Update notification status by ID
router.put('/notifications/:id/status', NotificationController.updateStatus);

export default router;
