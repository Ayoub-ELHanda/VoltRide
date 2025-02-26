import { PrismaClient } from '@prisma/client';
import { IUnitOfWork } from '../../../core/application/interfaces/IUnitOfWork';
import { IScooterRepository } from '../../../core/domain/repositories/IScooterRepository';
import { IScooterModelRepository } from '../../../core/domain/repositories/IScooterModelRepository';
import { IMaintenanceRepository } from '../../../core/domain/repositories/IMaintenanceRepository';
import { INotificationRepository } from '../../../core/domain/repositories/INotificationRepository';
import { PrismaService } from './PrismaService';
import { PrismaScooterRepository } from './repositories/PrismaScooterRepository';
import { PrismaScooterModelRepository } from './repositories/PrismaScooterModelRepository';
import { PrismaMaintenanceRepository } from './repositories/PrismaMaintenanceRepository';
import { PrismaNotificationRepository } from './repositories/PrismaNotificationRepository';

/**
 * PostgreSQL implementation of the Unit of Work using Prisma
 */
export class PrismaUnitOfWork implements IUnitOfWork {
  private prisma: PrismaClient;
  private scooterRepository: IScooterRepository;
  private scooterModelRepository: IScooterModelRepository;
  private maintenanceRepository: IMaintenanceRepository;
  private notificationRepository: INotificationRepository;

  /**
   * Constructor
   */
  constructor() {
    this.prisma = PrismaService.getClient();
    this.scooterRepository = new PrismaScooterRepository();
    this.scooterModelRepository = new PrismaScooterModelRepository();
    this.maintenanceRepository = new PrismaMaintenanceRepository();
    this.notificationRepository = new PrismaNotificationRepository();
  }

  /**
   * Gets the scooter repository
   * @returns The scooter repository
   */
  getScooterRepository(): IScooterRepository {
    return this.scooterRepository;
  }

  /**
   * Gets the scooter model repository
   * @returns The scooter model repository
   */
  getScooterModelRepository(): IScooterModelRepository {
    return this.scooterModelRepository;
  }

  /**
   * Gets the maintenance repository
   * @returns The maintenance repository
   */
  getMaintenanceRepository(): IMaintenanceRepository {
    return this.maintenanceRepository;
  }

  /**
   * Gets the notification repository
   * @returns The notification repository
   */
  getNotificationRepository(): INotificationRepository {
    return this.notificationRepository;
  }

  /**
   * Begins a transaction
   */
  async beginTransaction(): Promise<void> {
    // Prisma doesn't have a direct way to begin a transaction
    // We'll use a transaction callback in the actual implementation
    // For now, this is a placeholder
  }

  /**
   * Commits the current transaction
   */
  async commitTransaction(): Promise<void> {
    // Prisma doesn't have a direct way to commit a transaction
    // We'll use a transaction callback in the actual implementation
    // For now, this is a placeholder
  }

  /**
   * Rolls back the current transaction
   */
  async rollbackTransaction(): Promise<void> {
    // Prisma doesn't have a direct way to rollback a transaction
    // We'll use a transaction callback in the actual implementation
    // For now, this is a placeholder
  }

  /**
   * Releases all resources
   */
  async dispose(): Promise<void> {
    await PrismaService.disconnect();
  }

  /**
   * Executes a function within a transaction
   * @param fn The function to execute
   * @returns The result of the function
   */
  async executeTransaction<T>(fn: () => Promise<T>): Promise<T> {
    return this.prisma.$transaction(
      (_prisma: any) => fn(),
      {
        maxWait: 5000, // 5s maximum wait time
        timeout: 10000, // 10s maximum transaction time
      }
    );
  }
}
