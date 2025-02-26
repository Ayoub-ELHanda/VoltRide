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

export interface MaintenancePartDTO {
    id?: number;
    name: string;
    price: number;
    quantity: number;
}

export interface CreateMaintenanceDTO {
    type: string;
    date: string;
    cost: number;
    comment?: string;
    technicianName: string;
    scooterId: number;
    parts?: MaintenancePartDTO[];
}

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
