import { PrismaService } from './PrismaService';
import { Notification } from '../../domain/entities/Notification';

export class NotificationRepository {
    private prisma = PrismaService.getClient();

    async addNotification(notification: Notification) {
        return await this.prisma.notification.create({
            data: {
                recipient: notification.recipient,
                type: notification.type,
                status: notification.status,
                trigger_date: notification.triggerDate,  // Map triggerDate -> trigger_date
                message: notification.message
            }
        });
    }

    async updateNotificationStatus(id: string, status: string) {
        return await this.prisma.notification.update({
            where: { id },
            data: { status }
        });
    }

    async getAllNotifications() {
        return await this.prisma.notification.findMany();
    }
}
