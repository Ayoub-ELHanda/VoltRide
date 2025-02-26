/**
 * Interface for Maintenance Repository
 * Following the Dependency Inversion Principle, this interface is defined in the domain layer
 * and implemented in the infrastructure layer.
 */
export interface IMaintenanceRepository {
  addMaintenance(maintenance: any): Promise<any>;
  updateMaintenance(maintenance: any): Promise<any>;
  deleteMaintenance(id: number): Promise<any>;
  getAllMaintenances(): Promise<any[]>;
  getMaintenanceById(id: number): Promise<any | null>;
  getMaintenancesByScooterId(scooterId: number): Promise<any[]>;
}
