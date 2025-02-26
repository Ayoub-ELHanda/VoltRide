/**
 * Interface for Scooter Repository
 * Following the Dependency Inversion Principle, this interface is defined in the domain layer
 * and implemented in the infrastructure layer.
 */
export interface IScooterRepository {
  getAllScooters(): Promise<any[]>;
  getScooterById(id: number): Promise<any | null>;
  addScooter(scooter: any): Promise<any>;
  updateScooter(scooter: any): Promise<any>;
  deleteScooter(id: number): Promise<any>;
}
