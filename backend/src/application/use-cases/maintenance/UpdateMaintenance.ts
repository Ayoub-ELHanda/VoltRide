import { Maintenance } from '../../../domain/entities/Maintenance';
import { MaintenanceRepository } from '../../../infrastructure/orm/MaintenanceRepository';
import { UpdateMaintenanceDTO } from '../../dtos/MaintenanceDTO';

export class UpdateMaintenance {
    constructor(private maintenanceRepository: MaintenanceRepository) { }

    async execute(data: UpdateMaintenanceDTO) {
        const maintenance = new Maintenance(
            data.type || '',
            new Date(data.date || ''),
            data.cost || 0,
            data.comment || '',
            data.technicianName || '',
            data.scooterId || 0
        );

        maintenance.setId(data.id);

        return await this.maintenanceRepository.updateMaintenance(maintenance);
    }
}
