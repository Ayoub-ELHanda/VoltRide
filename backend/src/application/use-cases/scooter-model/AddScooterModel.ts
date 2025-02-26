import { ScooterModel } from '../../../domain/entities/ScooterModel';
import { ScooterModelRepository } from '../../../infrastructure/orm/ScooterModelRepository';
import { CreateScooterModelDTO } from '../../dtos/ScooterModelDTO';

export class AddScooterModel {
    private scooterModelRepository: ScooterModelRepository;

    constructor(scooterModelRepository: ScooterModelRepository) {
        this.scooterModelRepository = scooterModelRepository;
    }

    async execute(data: CreateScooterModelDTO) {
        const scooterModel = new ScooterModel(
            0,
            data.name,
            data.batteryRange,
            data.maintenanceInterval
        );
    }
}
