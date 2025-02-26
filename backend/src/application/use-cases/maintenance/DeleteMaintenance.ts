import { MaintenanceRepository } from '../../../infrastructure/orm/MaintenanceRepository';

export class DeleteMaintenance {
    constructor(private maintenanceRepository: MaintenanceRepository) {}

    async execute(id: number) {
        return await this.maintenanceRepository.deleteMaintenance(id);
    }
}
