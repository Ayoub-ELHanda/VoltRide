import { ScooterRepository } from '../../infrastructure/orm/ScooterRepository';

export class GetAllScooters {
    private scooterRepository: ScooterRepository;

    constructor(scooterRepository: ScooterRepository) {
        this.scooterRepository = scooterRepository;
    }

    async execute() {
        return await this.scooterRepository.getAllScooters();
    }
}
