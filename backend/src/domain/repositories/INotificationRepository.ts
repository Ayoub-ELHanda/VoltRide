/**
 * Interface for Notification Repository
 * Following the Dependency Inversion Principle, this interface is defined in the domain layer
 * and implemented in the infrastructure layer.
 */
export interface INotificationRepository {
  addNotification(notification: any): Promise<any>;
  updateNotificationStatus(id: string, status: string): Promise<any>;
  getAllNotifications(): Promise<any[]>;
  getNotificationById(id: string): Promise<any | null>;
  getNotificationsByRecipient(recipient: string): Promise<any[]>;
  getNotificationsByStatus(status: string): Promise<any[]>;
}
