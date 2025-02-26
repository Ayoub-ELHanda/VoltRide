import { Request, Response } from 'express';
import { NotificationRepository } from '../../infrastructure/orm/NotificationRepository';
import { CreateNotification } from '../../application/use-cases/notification/CreateNotification';
import { GetNotifications } from '../../application/use-cases/notification/GetNotifications';
import { UpdateNotificationStatus } from '../../application/use-cases/notification/UpdateNotificationStatus';
import { NotificationService } from '../../infrastructure/services/NotificationService';

const notificationRepository = new NotificationRepository();
const notificationService = new NotificationService();

export class NotificationController {
    // ✅ Old Functionality: Create Notification
    static async create(req: Request, res: Response) {
        try {
            const createNotification = new CreateNotification(notificationRepository);
            const notification = await createNotification.execute(req.body);

            // ✅ New Functionality: Send SMS and Email using Nodemailer
            if (req.body.type === 'sms' && req.body.recipient) {
                await notificationService.sendSMS(req.body.recipient, req.body.message);
            } else if (req.body.type === 'email' && req.body.recipient) {
                await notificationService.sendEmail(req.body.recipient, req.body.subject, req.body.message);
            }

            res.status(201).json(notification);
        } catch (error: any) {
            console.error("Error creating notification:", error);
            res.status(500).json({ 
                message: 'Erreur lors de la création de la notification', 
                error: error.message || 'Erreur inconnue' 
            });
        }
    }

    // ✅ Old Functionality: Update Notification Status
    static async updateStatus(req: Request, res: Response) {
        try {
            const updateNotificationStatus = new UpdateNotificationStatus(notificationRepository);
            await updateNotificationStatus.execute(parseInt(req.params.id), req.body.status);
            res.status(204).end();
        } catch (error: any) {
            console.error("Error updating notification status:", error);
            res.status(500).json({ 
                message: 'Erreur lors de la mise à jour du statut de la notification', 
                error: error.message || 'Erreur inconnue' 
            });
        }
    }

    // ✅ Old Functionality: Get All Notifications
    static async getAll(req: Request, res: Response) {
        try {
            const getNotifications = new GetNotifications(notificationRepository);
            const notifications = await getNotifications.execute();
            res.json(notifications);
        } catch (error: any) {
            console.error("Error getting notifications:", error);
            res.status(500).json({ 
                message: 'Erreur lors de la récupération des notifications', 
                error: error.message || 'Erreur inconnue' 
            });
        }
    }

    // ✅ New Functionality: Send Email using Nodemailer
    static async sendEmail(req: Request, res: Response) {
        try {
            const { recipient, subject, message } = req.body;
            await notificationService.sendEmail(recipient, subject, message);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error: any) {
            console.error("Error sending email:", error);
            res.status(500).json({ 
                message: 'Erreur lors de l\'envoi de l\'email', 
                error: error.message || 'Erreur inconnue' 
            });
        }
    }

    // ✅ New Functionality: Send SMS using Nodemailer
    static async sendSMS(req: Request, res: Response) {
        try {
            const { recipient, message } = req.body;
            await notificationService.sendSMS(recipient, message);
            res.status(200).json({ message: 'SMS sent successfully' });
        } catch (error: any) {
            console.error("Error sending SMS:", error);
            res.status(500).json({ 
                message: 'Erreur lors de l\'envoi du SMS', 
                error: error.message || 'Erreur inconnue' 
            });
        }
    }
}
