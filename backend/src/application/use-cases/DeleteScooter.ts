import { ScooterRepository } from '../../infrastructure/orm/ScooterRepository';

export class DeleteScooter {
    private scooterRepository: ScooterRepository;

    constructor(scooterRepository: ScooterRepository) {
        this.scooterRepository = scooterRepository;
    }

    async execute(scooterId: number) {
        return await this.scooterRepository.deleteScooter(scooterId);
    }
}
