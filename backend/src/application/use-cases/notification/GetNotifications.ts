import { NotificationRepository } from '../../../infrastructure/orm/NotificationRepository';

export class GetNotifications {
    constructor(private notificationRepository: NotificationRepository) {}

    async execute() {
        return await this.notificationRepository.getAllNotifications();
    }
}
