import { ScooterModel } from '../../domain/entities/ScooterModel';
import { ScooterModelRepository } from '../../infrastructure/orm/ScooterModelRepository';

export class AddScooterModel {
    private scooterModelRepository: ScooterModelRepository;

    constructor(scooterModelRepository: ScooterModelRepository) {
        this.scooterModelRepository = scooterModelRepository;
    }

    async execute(data: {
        name: string;
        batteryRange: number;
        maintenanceInterval: number;
    }) {
        const scooterModel = new ScooterModel(
            0,
            data.name,
            data.batteryRange,
            data.maintenanceInterval
        );
    }
}
