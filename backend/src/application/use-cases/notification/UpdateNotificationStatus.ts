import { NotificationRepository } from '../../../infrastructure/orm/NotificationRepository';

export class UpdateNotificationStatus {
    constructor(private notificationRepository: NotificationRepository) { }

    async execute(id: number, status: string) {
        const stringId = id.toString();

        return await this.notificationRepository.updateNotificationStatus(stringId, status);
    }

}
