import { ScooterRepository } from '../../../infrastructure/orm/ScooterRepository';

export class GetOneScooter {
    private scooterRepository: ScooterRepository;

    constructor(scooterRepository: ScooterRepository) {
        this.scooterRepository = scooterRepository;
    }

    async execute(scooterId: number) {
        return await this.scooterRepository.getScooterById(scooterId);
    }
}
