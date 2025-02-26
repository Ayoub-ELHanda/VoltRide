import { ScooterModelRepository } from '../../../infrastructure/orm/ScooterModelRepository';

export class GetAllScooterModels {
    private scooterModelRepository: ScooterModelRepository;

    constructor(scooterModelRepository: ScooterModelRepository) {
        this.scooterModelRepository = scooterModelRepository;
    }

    async execute() {
        return await this.scooterModelRepository.getAllScooterModels();
    }
}
