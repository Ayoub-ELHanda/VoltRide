import { Router } from 'express';
import { NotificationController } from '../../notifications/notifications.controller';
import { Notification, NotificationDocument } from '../../notifications/notification.schema';
import { NotificationModule } from '../../notifications/notifications.module';
import { Module } from '@nestjs/common';


import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// ✅ Create Router
const router = Router();

// ✅ Create Notification Controller
const notificationController = new NotificationController(
  InjectModel(Notification.name) as unknown as Model<NotificationDocument>
);

// ✅ Define Routes
router.get('/notifications', (req, res) => notificationController.getAll().then(result => res.json(result)));
router.get('/notifications/:id', (req, res) => notificationController.getById(req.params.id).then(result => res.json(result)));
router.post('/notifications', (req, res) => notificationController.create(req.body).then(result => res.json(result)));
router.delete('/notifications/:id', (req, res) => notificationController.delete(req.params.id).then(result => res.json(result)));

@Module({
    imports: [NotificationModule],
  })
  export class NotificationRoutesModule {}
  
export default router;
