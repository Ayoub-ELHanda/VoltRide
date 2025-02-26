import { Scooter } from '../../../../core/domain/entities/Scooter';
import { IScooterRepository } from '../../../../core/domain/repositories/IScooterRepository';

/**
 * In-memory implementation of the Scooter repository
 * This is useful for testing and development
 */
export class InMemoryScooterRepository implements IScooterRepository {
  private scooters: Map<number, Scooter> = new Map();
  private nextId: number = 1;

  /**
   * Gets all scooters
   * @returns A promise that resolves to an array of scooters
   */
  async getAllScooters(): Promise<Scooter[]> {
    return Array.from(this.scooters.values());
  }

  /**
   * Gets a scooter by ID
   * @param id The ID of the scooter to get
   * @returns A promise that resolves to a scooter or null if not found
   */
  async getScooterById(id: number): Promise<Scooter | null> {
    return this.scooters.get(id) || null;
  }

  /**
   * Adds a new scooter
   * @param scooter The scooter to add
   * @returns A promise that resolves to the added scooter
   */
  async addScooter(scooter: Scooter): Promise<Scooter> {
    // Create a copy of the scooter with a new ID
    const id = this.nextId++;
    
    // Create a new instance with the same properties but a new ID
    const newScooter = new Scooter(
      id,
      scooter.getLicensePlate(),
      scooter.getStatus(),
      scooter.getScooterModel(),
      scooter.getDealerId(),
      scooter.getPartnerId(),
      scooter.getLastMaintenanceDate()
    );
    
    this.scooters.set(id, newScooter);
    return newScooter;
  }

  /**
   * Updates a scooter
   * @param scooter The scooter to update
   * @returns A promise that resolves to the updated scooter
   */
  async updateScooter(scooter: Scooter): Promise<Scooter> {
    const id = scooter.getId();
    if (!this.scooters.has(id)) {
      throw new Error(`Scooter with ID ${id} not found.`);
    }
    
    this.scooters.set(id, scooter);
    return scooter;
  }

  /**
   * Deletes a scooter
   * @param id The ID of the scooter to delete
   * @returns A promise that resolves to the deleted scooter
   */
  async deleteScooter(id: number): Promise<Scooter> {
    const scooter = this.scooters.get(id);
    if (!scooter) {
      throw new Error(`Scooter with ID ${id} not found.`);
    }
    
    this.scooters.delete(id);
    return scooter;
  }

  /**
   * Clears all scooters (useful for testing)
   */
  clear(): void {
    this.scooters.clear();
    this.nextId = 1;
  }
}
