import { Scooter } from "../entities/Scooter";

export interface ScooterRepository {
    save(scooter: Scooter): Promise<void>;
    findById(id: string): Promise<Scooter | null>;
    findAll(): Promise<Scooter[]>;
    update(scooter: Scooter): Promise<void>;
    delete(id: string): Promise<void>;
}
