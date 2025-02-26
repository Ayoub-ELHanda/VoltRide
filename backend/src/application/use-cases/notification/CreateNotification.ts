import { Notification } from '../../../domain/entities/Notification';
import { NotificationRepository } from '../../../infrastructure/orm/NotificationRepository';
import { CreateNotificationDTO } from '../../dtos/NotificationDTO';

export class CreateNotification {
    constructor(private notificationRepository: NotificationRepository) { }

    async execute(data: CreateNotificationDTO) {
        const triggerDate = new Date(data.triggerDate);

        if (isNaN(triggerDate.getTime())) {
            throw new Error('Invalid date format for triggerDate');
        }

        const triggerDateString = triggerDate.toISOString();

        const notification = new Notification(
            data.message,
            data.recipient,
            data.type,
            triggerDateString,
            data.status || 'defaultStatus'
        );

        return await this.notificationRepository.addNotification(notification);
    }
}
