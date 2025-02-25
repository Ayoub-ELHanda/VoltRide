import { Request, Response } from 'express';
import { GetAllScooters } from '../../../application/use-cases/GetAllScooters';
import { ScooterRepository } from '../../orm/ScooterRepository';

const scooterRepository = new ScooterRepository();
const getAllScooters = new GetAllScooters(scooterRepository);

export class ScooterController {
    static async getAll(req: Request, res: Response) {
        try {
            const scooters = await getAllScooters.execute();
            res.json(scooters);
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur', error });
        }
    }
}
