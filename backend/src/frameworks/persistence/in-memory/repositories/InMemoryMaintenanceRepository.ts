import { Maintenance, MaintenancePart } from '../../../../core/domain/entities/Maintenance';
import { IMaintenanceRepository } from '../../../../core/domain/repositories/IMaintenanceRepository';

/**
 * In-memory implementation of the Maintenance repository
 * This is useful for testing and development
 */
export class InMemoryMaintenanceRepository implements IMaintenanceRepository {
  private maintenances: Map<number, Maintenance> = new Map();
  private nextId: number = 1;

  /**
   * Adds a new maintenance record
   * @param maintenance The maintenance record to add
   * @returns A promise that resolves to the added maintenance record
   */
  async addMaintenance(maintenance: Maintenance): Promise<Maintenance> {
    const id = this.nextId++;
    maintenance.setId(id);
    this.maintenances.set(id, maintenance);
    return maintenance;
  }

  /**
   * Updates a maintenance record
   * @param maintenance The maintenance record to update
   * @returns A promise that resolves to the updated maintenance record
   */
  async updateMaintenance(maintenance: Maintenance): Promise<Maintenance> {
    const id = maintenance.getId();
    if (!id || !this.maintenances.has(id)) {
      throw new Error(`Maintenance with ID ${id} not found.`);
    }
    
    this.maintenances.set(id, maintenance);
    return maintenance;
  }

  /**
   * Deletes a maintenance record
   * @param id The ID of the maintenance record to delete
   * @returns A promise that resolves to the deleted maintenance record
   */
  async deleteMaintenance(id: number): Promise<Maintenance> {
    const maintenance = this.maintenances.get(id);
    if (!maintenance) {
      throw new Error(`Maintenance with ID ${id} not found.`);
    }
    
    this.maintenances.delete(id);
    return maintenance;
  }

  /**
   * Gets all maintenance records
   * @returns A promise that resolves to an array of maintenance records
   */
  async getAllMaintenances(): Promise<Maintenance[]> {
    return Array.from(this.maintenances.values());
  }

  /**
   * Gets a maintenance record by ID
   * @param id The ID of the maintenance record to get
   * @returns A promise that resolves to a maintenance record or null if not found
   */
  async getMaintenanceById(id: number): Promise<Maintenance | null> {
    return this.maintenances.get(id) || null;
  }

  /**
   * Gets maintenance records by scooter ID
   * @param scooterId The ID of the scooter
   * @returns A promise that resolves to an array of maintenance records
   */
  async getMaintenancesByScooterId(scooterId: number): Promise<Maintenance[]> {
    return Array.from(this.maintenances.values()).filter(
      maintenance => maintenance.getScooterId() === scooterId
    );
  }

  /**
   * Clears all maintenance records (useful for testing)
   */
  clear(): void {
    this.maintenances.clear();
    this.nextId = 1;
  }
}
