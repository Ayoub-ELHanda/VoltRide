export interface ScooterDTO {
    id?: number;
    licensePlate: string;
    status: string;
    dealerId?: number;
    partnerId?: number;
    scooterModelId: number;
    lastMaintenanceDate?: string;
}

export interface CreateScooterDTO {
    licensePlate: string;
    status: string;
    dealerId?: number;
    partnerId?: number;
    scooterModelId: number;
}

export interface UpdateScooterDTO {
    id: number;
    licensePlate?: string;
    status?: string;
    dealerId?: number;
    partnerId?: number;
    scooterModelId: number;
}
