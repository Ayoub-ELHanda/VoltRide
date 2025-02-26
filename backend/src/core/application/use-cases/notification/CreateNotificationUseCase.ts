import { Notification, NotificationStatus, NotificationType } from '../../../domain/entities/Notification';
import { INotificationRepository } from '../../../domain/repositories/INotificationRepository';
import { CreateNotificationDTO, NotificationDTO } from '../../dtos/NotificationDTO';
import { IUnitOfWork } from '../../interfaces/IUnitOfWork';
import { INotificationService } from '../../interfaces/INotificationService';

/**
 * Use case for creating a new notification
 * Following the Clean Architecture principles, this use case depends on the repository interfaces
 * and not on the concrete implementations.
 */
export class CreateNotificationUseCase {
  private readonly notificationRepository: INotificationRepository;

  /**
   * Constructor
   * @param unitOfWork The unit of work
   * @param notificationService The notification service
   */
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly notificationService: INotificationService
  ) {
    this.notificationRepository = unitOfWork.getNotificationRepository();
  }

  /**
   * Executes the use case
   * @param data The data for creating a new notification
   * @returns A promise that resolves to the created notification DTO
   */
  async execute(data: CreateNotificationDTO): Promise<NotificationDTO> {
    try {
      // Begin transaction
      await this.unitOfWork.beginTransaction();

      // Set default status if not provided
      const status = data.status || NotificationStatus.PENDING;

      // Create a new notification entity
      const notification = new Notification(
        data.message,
        data.recipient,
        data.type,
        data.triggerDate,
        status
      );

      // Save the notification
      const savedNotification = await this.notificationRepository.addNotification(notification);

      // If the notification is due and pending, send it immediately
      if (notification.isDue() && notification.getStatus() === NotificationStatus.PENDING) {
        try {
          if (notification.isEmail()) {
            await this.notificationService.sendEmail(
              notification.getRecipient(),
              data.subject || 'Notification VoltRide',
              notification.getMessage()
            );
            notification.markAsSent();
          } else if (notification.isSMS()) {
            await this.notificationService.sendSMS(
              notification.getRecipient(),
              notification.getMessage()
            );
            notification.markAsSent();
          } else if (notification.isPush() && this.notificationService.sendPush) {
            await this.notificationService.sendPush(
              notification.getRecipient(),
              'Notification VoltRide',
              notification.getMessage()
            );
            notification.markAsSent();
          }

          // Update the notification status
          if (notification.getStatus() === NotificationStatus.SENT) {
            await this.notificationRepository.updateNotificationStatus(
              notification.getId() as string,
              NotificationStatus.SENT
            );
          }
        } catch (error) {
          notification.markAsFailed();
          await this.notificationRepository.updateNotificationStatus(
            notification.getId() as string,
            NotificationStatus.FAILED
          );
          console.error('Failed to send notification:', error);
        }
      }

      // Commit transaction
      await this.unitOfWork.commitTransaction();

      // Map the domain entity to a DTO
      return {
        id: savedNotification.getId(),
        message: savedNotification.getMessage(),
        recipient: savedNotification.getRecipient(),
        type: savedNotification.getType(),
        status: savedNotification.getStatus(),
        triggerDate: savedNotification.getTriggerDate().toISOString(),
        createdAt: savedNotification.getCreatedAt()?.toISOString(),
        updatedAt: savedNotification.getUpdatedAt()?.toISOString()
      };
    } catch (error) {
      // Rollback transaction in case of error
      await this.unitOfWork.rollbackTransaction();
      throw error;
    }
  }
}
