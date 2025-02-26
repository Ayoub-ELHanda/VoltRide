import { Maintenance } from '../../../domain/entities/Maintenance';
import { MaintenanceRepository } from '../../../infrastructure/orm/MaintenanceRepository';

export class UpdateMaintenance {
    constructor(private maintenanceRepository: MaintenanceRepository) {}

    async execute(data: {
        id: number;
        type: string;
        date: string;
        cost: number;
        comment: string;
        technician_name: string;
        scooter_id: number;
    }) {
        const maintenance = new Maintenance(
            data.type,
            new Date(data.date),
            data.cost,
            data.comment,
            data.technician_name,
            data.scooter_id
        );
        
        // Set the ID for the existing record
        maintenance.setId(data.id);

        return await this.maintenanceRepository.updateMaintenance(maintenance);
    }
}
