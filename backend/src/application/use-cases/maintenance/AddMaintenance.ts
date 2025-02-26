import { Maintenance } from '../../../domain/entities/Maintenance';
import { MaintenanceRepository } from '../../../infrastructure/orm/MaintenanceRepository';
import { MaintenanceDTO } from '../../dtos/MaintenanceDTO';

export class AddMaintenance {
    constructor(private maintenanceRepository: MaintenanceRepository) { }

    async execute(data: MaintenanceDTO) {
        const { type, date, cost, comment, technicianName, scooterId } = data;

        const maintenance = new Maintenance(
            type,
            new Date(date),
            cost,
            comment || '',
            technicianName,
            scooterId
        );

        return await this.maintenanceRepository.addMaintenance(maintenance);
    }
}
