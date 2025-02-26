import { INotificationService } from '../../core/application/interfaces/INotificationService';

/**
 * Implementation of the Notification Service that logs to the console
 * This is useful for testing and development
 */
export class ConsoleNotificationService implements INotificationService {
  /**
   * Sends an email notification
   * @param to Email recipient
   * @param subject Email subject
   * @param message Email content
   */
  async sendEmail(to: string, subject: string, message: string): Promise<void> {
    console.log('=== EMAIL NOTIFICATION ===');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('=========================');
  }

  /**
   * Sends an SMS notification
   * @param to Phone number recipient
   * @param message SMS content
   */
  async sendSMS(to: string, message: string): Promise<void> {
    console.log('=== SMS NOTIFICATION ===');
    console.log(`To: ${to}`);
    console.log(`Message: ${message}`);
    console.log('=======================');
  }

  /**
   * Sends a push notification
   * @param to Device token or user ID
   * @param title Notification title
   * @param message Notification content
   * @param data Additional data to send with the notification
   */
  async sendPush(to: string, title: string, message: string, data?: Record<string, any>): Promise<void> {
    console.log('=== PUSH NOTIFICATION ===');
    console.log(`To: ${to}`);
    console.log(`Title: ${title}`);
    console.log(`Message: ${message}`);
    if (data) {
      console.log('Data:', data);
    }
    console.log('=========================');
  }
}
