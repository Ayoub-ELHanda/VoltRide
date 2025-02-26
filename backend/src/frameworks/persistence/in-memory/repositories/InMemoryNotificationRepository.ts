import { Notification } from '../../../../core/domain/entities/Notification';
import { INotificationRepository } from '../../../../core/domain/repositories/INotificationRepository';
import { v4 as uuidv4 } from 'uuid';

/**
 * In-memory implementation of the Notification repository
 * This is useful for testing and development
 */
export class InMemoryNotificationRepository implements INotificationRepository {
  private notifications: Map<string, Notification> = new Map();

  /**
   * Adds a new notification
   * @param notification The notification to add
   * @returns A promise that resolves to the added notification
   */
  async addNotification(notification: Notification): Promise<Notification> {
    const id = notification.getId() || uuidv4();
    notification.setId(id);
    
    // Set created and updated dates if not already set
    if (!notification.getCreatedAt()) {
      const now = new Date();
      // @ts-ignore - TypeScript doesn't know about these methods
      notification.createdAt = now;
      // @ts-ignore - TypeScript doesn't know about these methods
      notification.updatedAt = now;
    }
    
    this.notifications.set(id, notification);
    return notification;
  }

  /**
   * Updates a notification's status
   * @param id The ID of the notification to update
   * @param status The new status
   * @returns A promise that resolves to the updated notification
   */
  async updateNotificationStatus(id: string, status: string): Promise<Notification> {
    const notification = this.notifications.get(id);
    if (!notification) {
      throw new Error(`Notification with ID ${id} not found.`);
    }
    
    notification.setStatus(status);
    // @ts-ignore - TypeScript doesn't know about this property
    notification.updatedAt = new Date();
    
    this.notifications.set(id, notification);
    return notification;
  }

  /**
   * Gets all notifications
   * @returns A promise that resolves to an array of notifications
   */
  async getAllNotifications(): Promise<Notification[]> {
    return Array.from(this.notifications.values());
  }

  /**
   * Gets a notification by ID
   * @param id The ID of the notification to get
   * @returns A promise that resolves to a notification or null if not found
   */
  async getNotificationById(id: string): Promise<Notification | null> {
    return this.notifications.get(id) || null;
  }

  /**
   * Gets notifications by recipient
   * @param recipient The recipient
   * @returns A promise that resolves to an array of notifications
   */
  async getNotificationsByRecipient(recipient: string): Promise<Notification[]> {
    return Array.from(this.notifications.values()).filter(
      notification => notification.getRecipient() === recipient
    );
  }

  /**
   * Gets notifications by status
   * @param status The status
   * @returns A promise that resolves to an array of notifications
   */
  async getNotificationsByStatus(status: string): Promise<Notification[]> {
    return Array.from(this.notifications.values()).filter(
      notification => notification.getStatus() === status
    );
  }

  /**
   * Clears all notifications (useful for testing)
   */
  clear(): void {
    this.notifications.clear();
  }
}
