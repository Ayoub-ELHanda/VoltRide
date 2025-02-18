import { Scooter } from "../../domain/entities/Scooter";
import { ScooterRepository } from "../../domain/repositories/ScooterRepository";

export class InMemoryScooterRepository implements ScooterRepository {
    private scooters: Scooter[] = [];

    async save(scooter: Scooter): Promise<void> {
        this.scooters.push(scooter);
    }

    async findById(id: string): Promise<Scooter | null> {
        return this.scooters.find(scooter => scooter.getId() === id) || null;
    }

    async findAll(): Promise<Scooter[]> {
        return this.scooters;
    }

    async update(scooter: Scooter): Promise<void> {
        const index = this.scooters.findIndex(s => s.getId() === scooter.getId());
        if (index !== -1) {
            this.scooters[index] = scooter;
        }
    }

    async delete(id: string): Promise<void> {
        this.scooters = this.scooters.filter(scooter => scooter.getId() !== id);
    }
}
