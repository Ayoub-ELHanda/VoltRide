import { MaintenanceRepository } from '../../../infrastructure/orm/MaintenanceRepository';

export class GetMaintenanceById {
    constructor(private maintenanceRepository: MaintenanceRepository) { }

    async execute(id: number) {
        return await this.maintenanceRepository.getMaintenanceById(id);
    }
}
