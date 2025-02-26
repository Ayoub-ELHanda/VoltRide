import { ScooterModel } from '../../../../core/domain/entities/ScooterModel';
import { IScooterModelRepository } from '../../../../core/domain/repositories/IScooterModelRepository';

/**
 * In-memory implementation of the ScooterModel repository
 * This is useful for testing and development
 */
export class InMemoryScooterModelRepository implements IScooterModelRepository {
  private scooterModels: Map<number, ScooterModel> = new Map();
  private nextId: number = 1;

  /**
   * Gets all scooter models
   * @returns A promise that resolves to an array of scooter models
   */
  async getAllScooterModels(): Promise<ScooterModel[]> {
    return Array.from(this.scooterModels.values());
  }

  /**
   * Gets a scooter model by ID
   * @param id The ID of the scooter model to get
   * @returns A promise that resolves to a scooter model or null if not found
   */
  async getScooterModelById(id: number): Promise<ScooterModel | null> {
    return this.scooterModels.get(id) || null;
  }

  /**
   * Adds a new scooter model
   * @param scooterModel The scooter model to add
   * @returns A promise that resolves to the added scooter model
   */
  async addScooterModel(scooterModel: ScooterModel): Promise<ScooterModel> {
    // Create a copy of the scooter model with a new ID
    const id = this.nextId++;
    
    // Create a new instance with the same properties but a new ID
    const newScooterModel = new ScooterModel(
      id,
      scooterModel.getName(),
      scooterModel.getBatteryRange(),
      scooterModel.getMaintenanceInterval()
    );
    
    this.scooterModels.set(id, newScooterModel);
    return newScooterModel;
  }

  /**
   * Updates a scooter model
   * @param scooterModel The scooter model to update
   * @returns A promise that resolves to the updated scooter model
   */
  async updateScooterModel(scooterModel: ScooterModel): Promise<ScooterModel> {
    const id = scooterModel.getId();
    if (!this.scooterModels.has(id)) {
      throw new Error(`Scooter model with ID ${id} not found.`);
    }
    
    this.scooterModels.set(id, scooterModel);
    return scooterModel;
  }

  /**
   * Deletes a scooter model
   * @param id The ID of the scooter model to delete
   * @returns A promise that resolves to the deleted scooter model
   */
  async deleteScooterModel(id: number): Promise<ScooterModel> {
    const scooterModel = this.scooterModels.get(id);
    if (!scooterModel) {
      throw new Error(`Scooter model with ID ${id} not found.`);
    }
    
    this.scooterModels.delete(id);
    return scooterModel;
  }

  /**
   * Clears all scooter models (useful for testing)
   */
  clear(): void {
    this.scooterModels.clear();
    this.nextId = 1;
  }
}
