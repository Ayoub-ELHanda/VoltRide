export interface ScooterModelDTO {
    id?: number;
    name: string;
    batteryRange: number;
    maintenanceInterval: number;
}

export interface CreateScooterModelDTO {
    name: string;
    batteryRange: number;
    maintenanceInterval: number;
}

export interface UpdateScooterModelDTO {
    id: number;
    name?: string;
    batteryRange?: number;
    maintenanceInterval?: number;
}
