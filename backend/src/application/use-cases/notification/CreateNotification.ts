import { Notification } from '../../../domain/entities/Notification';
import { NotificationRepository } from '../../../infrastructure/orm/NotificationRepository';

export class CreateNotification {
    constructor(private notificationRepository: NotificationRepository) {}

    async execute(data: {
        message: string;
        recipient: string;
        type: string;
        status: string;
        triggerDate: string;  // Received as a string
    }) {
        // 1. Convert triggerDate from string to Date
        const triggerDate = new Date(data.triggerDate);

        // 2. Check if triggerDate is valid
        if (isNaN(triggerDate.getTime())) {
            throw new Error('Invalid date format for triggerDate');
        }

        // 3. Convert Date to ISO String
        const triggerDateString = triggerDate.toISOString();

        // 4. Pass as string
        const notification = new Notification(
            data.message,
            data.recipient,
            data.type,
            triggerDateString,  // Pass as string
            data.status
        );

        // 5. Save to Repository
        return await this.notificationRepository.addNotification(notification);
    }
}
