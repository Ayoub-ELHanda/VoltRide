import { Request, Response } from 'express';
import { ScooterModelRepository } from '../../orm/ScooterModelRepository';
import { GetAllScooterModels } from '../../../application/use-cases/GetAllScooterModels';
import { AddScooterModel } from '../../../application/use-cases/AddScooterModel';

const scooterModelRepository = new ScooterModelRepository();
const getAllScooterModels = new GetAllScooterModels(scooterModelRepository);
const addScooterModel = new AddScooterModel(scooterModelRepository);

export class ScooterModelController {
    static async getAll(req: Request, res: Response) {
        try {
            const scooterModels = await getAllScooterModels.execute();
            res.json(scooterModels);
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur', error });
        }
    }

    static async add(req: Request, res: Response) {
        try {
            const scooterModel = await addScooterModel.execute(req.body);
            res.status(201).json(scooterModel);
        } catch (error) {
            res.status(400).json({ message: 'Erreur lors de l\'ajout du modèle de scooter', error });
        }
    }
}
