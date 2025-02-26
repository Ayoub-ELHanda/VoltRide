/**
 * Interface for Notification Service
 * Following the Dependency Inversion Principle, this interface is defined in the application layer
 * and implemented in the infrastructure layer.
 */
export interface INotificationService {
  /**
   * Sends an email notification
   * @param to Email recipient
   * @param subject Email subject
   * @param message Email content
   */
  sendEmail(to: string, subject: string, message: string): Promise<void>;
  
  /**
   * Sends an SMS notification
   * @param to Phone number recipient
   * @param message SMS content
   */
  sendSMS(to: string, message: string): Promise<void>;
  
  /**
   * Sends a push notification
   * @param to Device token or user ID
   * @param title Notification title
   * @param message Notification content
   * @param data Additional data to send with the notification
   */
  sendPush?(to: string, title: string, message: string, data?: Record<string, any>): Promise<void>;
}
