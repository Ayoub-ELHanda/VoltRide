import { MaintenanceRepository } from '../../../infrastructure/orm/MaintenanceRepository';

export class GetAllMaintenances {
    constructor(private maintenanceRepository: MaintenanceRepository) { }

    async execute() {
        return await this.maintenanceRepository.getAllMaintenances();
    }
}
