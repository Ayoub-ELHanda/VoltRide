/**
 * Data Transfer Object for Maintenance
 * Used to transfer data between the application layer and the interface layer
 */
export interface MaintenanceDTO {
  id?: number;
  type: string;
  date: string;
  cost: number;
  comment?: string;
  technicianName: string;
  scooterId: number;
  parts?: MaintenancePartDTO[];
}

/**
 * Data Transfer Object for Maintenance Part
 */
export interface MaintenancePartDTO {
  id?: number;
  name: string;
  price: number;
  quantity: number;
}

/**
 * Data Transfer Object for creating a new Maintenance
 */
export interface CreateMaintenanceDTO {
  type: string;
  date: string;
  cost: number;
  comment?: string;
  technicianName: string;
  scooterId: number;
  parts?: MaintenancePartDTO[];
}

/**
 * Data Transfer Object for updating a Maintenance
 */
export interface UpdateMaintenanceDTO {
  id: number;
  type?: string;
  date?: string;
  cost?: number;
  comment?: string;
  technicianName?: string;
  scooterId?: number;
  parts?: MaintenancePartDTO[];
}
