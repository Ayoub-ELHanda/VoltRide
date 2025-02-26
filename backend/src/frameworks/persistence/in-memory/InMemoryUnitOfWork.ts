import { IUnitOfWork } from '../../../core/application/interfaces/IUnitOfWork';
import { IScooterRepository } from '../../../core/domain/repositories/IScooterRepository';
import { IScooterModelRepository } from '../../../core/domain/repositories/IScooterModelRepository';
import { IMaintenanceRepository } from '../../../core/domain/repositories/IMaintenanceRepository';
import { INotificationRepository } from '../../../core/domain/repositories/INotificationRepository';
import { InMemoryScooterRepository } from './repositories/InMemoryScooterRepository';
import { InMemoryScooterModelRepository } from './repositories/InMemoryScooterModelRepository';
import { InMemoryMaintenanceRepository } from './repositories/InMemoryMaintenanceRepository';
import { InMemoryNotificationRepository } from './repositories/InMemoryNotificationRepository';

/**
 * In-memory implementation of the Unit of Work
 * This is useful for testing and development
 */
export class InMemoryUnitOfWork implements IUnitOfWork {
  private scooterRepository: InMemoryScooterRepository;
  private scooterModelRepository: InMemoryScooterModelRepository;
  private maintenanceRepository: InMemoryMaintenanceRepository;
  private notificationRepository: InMemoryNotificationRepository;
  private isTransactionActive: boolean = false;

  /**
   * Constructor
   */
  constructor() {
    this.scooterRepository = new InMemoryScooterRepository();
    this.scooterModelRepository = new InMemoryScooterModelRepository();
    this.maintenanceRepository = new InMemoryMaintenanceRepository();
    this.notificationRepository = new InMemoryNotificationRepository();
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
    if (this.isTransactionActive) {
      throw new Error('Transaction already active');
    }
    this.isTransactionActive = true;
  }

  /**
   * Commits the current transaction
   */
  async commitTransaction(): Promise<void> {
    if (!this.isTransactionActive) {
      throw new Error('No active transaction to commit');
    }
    this.isTransactionActive = false;
  }

  /**
   * Rolls back the current transaction
   */
  async rollbackTransaction(): Promise<void> {
    if (!this.isTransactionActive) {
      throw new Error('No active transaction to rollback');
    }
    this.isTransactionActive = false;
  }

  /**
   * Releases all resources
   */
  async dispose(): Promise<void> {
    // Nothing to dispose in the in-memory implementation
  }

  /**
   * Clears all repositories (useful for testing)
   */
  clear(): void {
    this.scooterRepository.clear();
    this.scooterModelRepository.clear();
    this.maintenanceRepository.clear();
    this.notificationRepository.clear();
  }
}
