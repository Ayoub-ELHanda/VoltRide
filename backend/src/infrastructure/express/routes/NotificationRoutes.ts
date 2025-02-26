import { Router } from 'express';
import { NotificationController } from '../controllers/NotificationController';

const router = Router();

// Get all notifications
router.get('/', NotificationController.getAll);

// Create a new notification
router.post('/', NotificationController.create);

// Update notification status by ID
router.put('/:id/status', NotificationController.updateStatus);

// Send Email Notification using Nodemailer
router.post('/send-email', NotificationController.sendEmail);

// Send SMS Notification using Nodemailer
router.post('/send-sms', NotificationController.sendSMS);

export default router;
