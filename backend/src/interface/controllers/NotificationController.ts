import { Request, Response } from 'express';
import { NotificationRepository } from '../../infrastructure/orm/NotificationRepository';
import { CreateNotification } from '../../application/use-cases/notification/CreateNotification';
import { GetNotifications } from '../../application/use-cases/notification/GetNotifications';
import { UpdateNotificationStatus } from '../../application/use-cases/notification/UpdateNotificationStatus';

const notificationRepository = new NotificationRepository();

export class NotificationController {
    static async create(req: Request, res: Response) {
        const createNotification = new CreateNotification(notificationRepository);
        const notification = await createNotification.execute(req.body);
        res.status(201).json(notification);
    }

    static async updateStatus(req: Request, res: Response) {
        const updateNotificationStatus = new UpdateNotificationStatus(notificationRepository);
        await updateNotificationStatus.execute(parseInt(req.params.id), req.body.status);
        res.status(204).end();
    }

    static async getAll(req: Request, res: Response) {
        const getNotifications = new GetNotifications(notificationRepository);
        const notifications = await getNotifications.execute();
        res.json(notifications);
    }
}
