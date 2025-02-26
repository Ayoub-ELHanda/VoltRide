export interface Scooter {
  id: number;
  licensePlate: string;
  status: ScooterStatus;
  dealerId?: number;
  partnerId?: number;
  scooterModelId: number;
  lastMaintenanceDate?: string;
}

export enum ScooterStatus {
  AVAILABLE = 'AVAILABLE',
  MAINTENANCE = 'MAINTENANCE',
  RESERVED = 'RESERVED',
  IN_USE = 'IN_USE',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE'
}

export interface ScooterModel {
  id: number;
  name: string;
  manufacturer: string;
  maxSpeed: number;
  autonomy: number;
  weight: number;
  maintenanceInterval: number;
}

export interface MaintenanceDTO {
  id?: number;
  scooterId: number;
  type: 'PREVENTIVE' | 'CORRECTIVE';
  description: string;
  date: string;
  technician: string;
  cost: number;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}
