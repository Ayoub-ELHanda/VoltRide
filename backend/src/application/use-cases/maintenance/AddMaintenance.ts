import { Maintenance } from '../../../domain/entities/Maintenance';
import { MaintenanceRepository } from '../../../infrastructure/orm/MaintenanceRepository';

export class AddMaintenance {
    constructor(private maintenanceRepository: MaintenanceRepository) {}

    async execute(data: any) {
        const { type, date, cost, comment, technician_name, scooter_id } = data;

        // Ensure the scooter_id is being passed to the domain entity
        const maintenance = new Maintenance(
            type,
            new Date(date),
            cost,
            comment,
            technician_name,
            parseInt(scooter_id)
        );

        return await this.maintenanceRepository.addMaintenance(maintenance);
    }
}
