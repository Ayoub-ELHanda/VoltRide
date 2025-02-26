/**
 * Data Transfer Object for Scooter
 * Used to transfer data between the application layer and the interface layer
 */
export interface ScooterDTO {
  id?: number;
  licensePlate: string;
  status: string;
  dealerId?: number;
  partnerId?: number;
  scooterModelId: number;
  lastMaintenanceDate?: string;
}

/**
 * Data Transfer Object for creating a new Scooter
 */
export interface CreateScooterDTO {
  licensePlate: string;
  status: string;
  dealerId?: number;
  partnerId?: number;
  scooterModelId: number;
}

/**
 * Data Transfer Object for updating a Scooter
 */
export interface UpdateScooterDTO {
  id: number;
  licensePlate?: string;
  status?: string;
  dealerId?: number;
  partnerId?: number;
  scooterModelId?: number;
}
