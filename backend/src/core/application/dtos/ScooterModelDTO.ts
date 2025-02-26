/**
 * Data Transfer Object for ScooterModel
 * Used to transfer data between the application layer and the interface layer
 */
export interface ScooterModelDTO {
  id?: number;
  name: string;
  batteryRange: number;
  maintenanceInterval: number;
}

/**
 * Data Transfer Object for creating a new ScooterModel
 */
export interface CreateScooterModelDTO {
  name: string;
  batteryRange: number;
  maintenanceInterval: number;
}

/**
 * Data Transfer Object for updating a ScooterModel
 */
export interface UpdateScooterModelDTO {
  id: number;
  name?: string;
  batteryRange?: number;
  maintenanceInterval?: number;
}
