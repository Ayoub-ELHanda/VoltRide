/**
 * Interface for ScooterModel Repository
 * Following the Dependency Inversion Principle, this interface is defined in the domain layer
 * and implemented in the infrastructure layer.
 */
export interface IScooterModelRepository {
  getAllScooterModels(): Promise<any[]>;
  getScooterModelById(id: number): Promise<any | null>;
  addScooterModel(scooterModel: any): Promise<any>;
  updateScooterModel(scooterModel: any): Promise<any>;
  deleteScooterModel(id: number): Promise<any>;
}
