import { Request, Response } from 'express';
import { ScooterRepository } from '../../orm/ScooterRepository';
import { GetAllScooters } from '../../../application/use-cases/GetAllScooters';
import { GetOneScooter } from '../../../application/use-cases/GetOneScooter';
import { AddScooter } from '../../../application/use-cases/AddScooter';
import { UpdateScooter } from '../../../application/use-cases/UpdateScooter';

const scooterRepository = new ScooterRepository();
const getAllScooters = new GetAllScooters(scooterRepository);
const getOneScooter = new GetOneScooter(scooterRepository);
const addScooter = new AddScooter(scooterRepository);
const updateScooter = new UpdateScooter(scooterRepository);

export class ScooterController {
    static async getAll(req: Request, res: Response) {
        try {
            const scooters = await getAllScooters.execute();
            res.json(scooters);
        } catch (error: any) {
            res.status(400).json({ message: 'Erreur lors de la récupération des scooters', error: error.message || 'Erreur inconnue' });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const scooter = await getOneScooter.execute(parseInt(req.params.id));
            res.json(scooter);
        } catch (error: any) {
            res.status(400).json({ message: 'Erreur lors de la récupération du scooter', error: error.message || 'Erreur inconnue' });
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

    static async update(req: Request, res: Response) {
        try {
            const scooter = await updateScooter.execute(req.body);
            res.json(scooter);
        } catch (error: any) {
            res.status(400).json({ message: 'Erreur lors de la mise à jour du scooter', error: error.message || 'Erreur inconnue' });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await scooterRepository.deleteScooter(parseInt(req.params.id));
            res.status(204).end();
        } catch (error: any) {
            res.status(400).json({ message: 'Erreur lors de la suppression du scooter', error: error.message || 'Erreur inconnue' });
        }
    }
}
