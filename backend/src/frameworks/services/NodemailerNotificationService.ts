import nodemailer from 'nodemailer';
import { INotificationService } from '../../core/application/interfaces/INotificationService';

/**
 * Implementation of the Notification Service using Nodemailer
 */
export class NodemailerNotificationService implements INotificationService {
  private emailTransporter;

  /**
   * Constructor
   */
  constructor() {
    this.emailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  /**
   * Sends an email notification
   * @param to Email recipient
   * @param subject Email subject
   * @param message Email content
   */
  async sendEmail(to: string, subject: string, message: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message
    };

    try {
      await this.emailTransporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Erreur lors de l'envoi de l'email");
    }
  }

  /**
   * Sends an SMS notification using Nodemailer and Nexmo
   * @param to Phone number recipient
   * @param message SMS content
   */
  async sendSMS(to: string, message: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${to}@sms.vonage.com`, // Nexmo (Vonage) SMS Gateway
      subject: 'SMS Notification',
      text: message
    };

    try {
      await this.emailTransporter.sendMail(mailOptions);
      console.log("SMS sent successfully");
    } catch (error) {
      console.error("Error sending SMS:", error);
      throw new Error("Erreur lors de l'envoi du SMS");
    }
  }

  /**
   * Sends a push notification
   * This is a placeholder implementation
   * @param to Device token or user ID
   * @param title Notification title
   * @param message Notification content
   * @param data Additional data to send with the notification
   */
  async sendPush(to: string, title: string, message: string, data?: Record<string, any>): Promise<void> {
    // This is a placeholder implementation
    // In a real application, you would use a push notification service like Firebase Cloud Messaging
    console.log(`Push notification sent to ${to}: ${title} - ${message}`);
    if (data) {
      console.log('Additional data:', data);
    }
  }
}
