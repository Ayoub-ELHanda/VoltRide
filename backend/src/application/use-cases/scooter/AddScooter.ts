import { Scooter } from '../../domain/entities/Scooter';
import { ScooterModel } from '../../domain/entities/ScooterModel';
import { ScooterRepository } from '../../infrastructure/orm/ScooterRepository';
import { ScooterModelRepository } from '../../infrastructure/orm/ScooterModelRepository';

export class AddScooter {
    private scooterRepository: ScooterRepository;

    constructor(scooterRepository: ScooterRepository) {
        this.scooterRepository = scooterRepository;
    }

    async execute(data: {
        licensePlate: string;
        status: string;
        dealerId: number;
        partnerId: number;
        scooterModelId: number;
    }) {
        const scooterModelRepository = new ScooterModelRepository();
        const existingScooterModel = await scooterModelRepository.getScooterModelById(data.scooterModelId);

        if (!existingScooterModel) {
            throw new Error("Le modèle de scooter n'existe pas.");
        }

        const scooterModel = new ScooterModel(
            existingScooterModel.id,
            existingScooterModel.name,
            existingScooterModel.battery_range,
            existingScooterModel.maintenance_interval,
        );

        const scooter = new Scooter(
            0,
            data.licensePlate,
            data.status,
            data.dealerId,
            data.partnerId,
            scooterModel,
        );

        return await this.scooterRepository.addScooter(scooter);
    }
}
