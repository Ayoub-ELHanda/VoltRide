import { PrismaClient } from '@prisma/client';
import { Notification, NotificationStatus, NotificationType } from '../../../../core/domain/entities/Notification';
import { INotificationRepository } from '../../../../core/domain/repositories/INotificationRepository';
import { PrismaService } from '../PrismaService';

/**
 * PostgreSQL implementation of the Notification repository using Prisma
 */
export class PrismaNotificationRepository implements INotificationRepository {
  private prisma: PrismaClient;

  /**
   * Constructor
   */
  constructor() {
    this.prisma = PrismaService.getClient();
  }

  /**
   * Adds a new notification
   * @param notification The notification to add
   * @returns A promise that resolves to the added notification
   */
  async addNotification(notification: Notification): Promise<Notification> {
    // Create the notification
    const createdNotification = await this.prisma.notification.create({
      data: {
        message: notification.getMessage(),
        recipient: notification.getRecipient(),
        type: notification.getType(),
        status: notification.getStatus(),
        trigger_date: notification.getTriggerDate(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    // Set the ID on the domain entity
    notification.setId(createdNotification.id);

    return notification;
  }

  /**
   * Updates a notification's status
   * @param id The ID of the notification to update
   * @param status The new status
   * @returns A promise that resolves to the updated notification
   */
  async updateNotificationStatus(id: string, status: string): Promise<Notification> {
    // Update the notification
    const updatedNotification = await this.prisma.notification.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date()
      }
    });

    return this.mapToDomainEntity(updatedNotification);
  }

  /**
   * Gets all notifications
   * @returns A promise that resolves to an array of notifications
   */
  async getAllNotifications(): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany();
    
    return notifications.map((notification: any) => this.mapToDomainEntity(notification));
  }

  /**
   * Gets a notification by ID
   * @param id The ID of the notification to get
   * @returns A promise that resolves to a notification or null if not found
   */
  async getNotificationById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id }
    });

    if (!notification) {
      return null;
    }

    return this.mapToDomainEntity(notification);
  }

  /**
   * Gets notifications by recipient
   * @param recipient The recipient
   * @returns A promise that resolves to an array of notifications
   */
  async getNotificationsByRecipient(recipient: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { recipient }
    });

    return notifications.map((notification: any) => this.mapToDomainEntity(notification));
  }

  /**
   * Gets notifications by status
   * @param status The status
   * @returns A promise that resolves to an array of notifications
   */
  async getNotificationsByStatus(status: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { status }
    });

    return notifications.map((notification: any) => this.mapToDomainEntity(notification));
  }

  /**
   * Maps a Prisma notification to a domain entity
   * @param prismaNotification The Prisma notification
   * @returns The domain entity
   */
  private mapToDomainEntity(prismaNotification: any): Notification {
    return new Notification(
      prismaNotification.message,
      prismaNotification.recipient,
      prismaNotification.type,
      prismaNotification.trigger_date,
      prismaNotification.status,
      prismaNotification.id,
      prismaNotification.createdAt,
      prismaNotification.updatedAt
    );
  }
}
