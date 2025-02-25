import { Request, Response } from 'express';
import { ScooterRepository } from '../../orm/ScooterRepository';
import { GetAllScooters } from '../../../application/use-cases/GetAllScooters';
import { AddScooter } from '../../../application/use-cases/AddScooter';

const scooterRepository = new ScooterRepository();
const getAllScooters = new GetAllScooters(scooterRepository);
const addScooter = new AddScooter(scooterRepository);

export class ScooterController {
    static async getAll(req: Request, res: Response) {
        try {
            const scooters = await getAllScooters.execute();
            res.json(scooters);
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur', error });
        }
    }

    static async add(req: Request, res: Response) {
        try {
            const scooter = await addScooter.execute(req.body);
            res.status(201).json(scooter);
        } catch (error: any) {
            res.status(400).json({ message: 'Erreur lors de l\'ajout du scooter', error: error.message || 'Erreur inconnue' });
        }
    }
}
