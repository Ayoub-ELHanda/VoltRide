import { Scooter } from "../../domain/entities/Scooter";
import { ScooterRepository } from "../../domain/repositories/ScooterRepository";

export class ScooterService {
    constructor(private scooterRepository: ScooterRepository) { }

    async getAllScooters(): Promise<Scooter[]> {
        return await this.scooterRepository.findAll();
    }

    async getScooterById(id: string): Promise<Scooter | null> {
        return await this.scooterRepository.findById(id);
    }

    async createScooter(scooter: Scooter): Promise<void> {
        await this.scooterRepository.save(scooter);
    }
}
