import { IScooterRepository } from '../../domain/repositories/IScooterRepository';
import { IScooterModelRepository } from '../../domain/repositories/IScooterModelRepository';
import { IMaintenanceRepository } from '../../domain/repositories/IMaintenanceRepository';
import { INotificationRepository } from '../../domain/repositories/INotificationRepository';

/**
 * Interface for Unit of Work
 * Provides a way to group operations into a single transaction
 * and ensures that all repositories share the same database context.
 */
export interface IUnitOfWork {
  /**
   * Gets the scooter repository
   */
  getScooterRepository(): IScooterRepository;
  
  /**
   * Gets the scooter model repository
   */
  getScooterModelRepository(): IScooterModelRepository;
  
  /**
   * Gets the maintenance repository
   */
  getMaintenanceRepository(): IMaintenanceRepository;
  
  /**
   * Gets the notification repository
   */
  getNotificationRepository(): INotificationRepository;
  
  /**
   * Begins a transaction
   */
  beginTransaction(): Promise<void>;
  
  /**
   * Commits the current transaction
   */
  commitTransaction(): Promise<void>;
  
  /**
   * Rolls back the current transaction
   */
  rollbackTransaction(): Promise<void>;
  
  /**
   * Releases all resources
   */
  dispose(): Promise<void>;
}
