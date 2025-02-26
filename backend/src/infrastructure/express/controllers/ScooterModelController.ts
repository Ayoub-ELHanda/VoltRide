import { Request, Response } from 'express';
import { ScooterModelRepository } from '../../orm/ScooterModelRepository';
import { ScooterModel } from '../../../domain/entities/ScooterModel';

const scooterModelRepository = new ScooterModelRepository();

export class ScooterModelController {
    /**
     * Get all scooter models
     */
    static async getAll(req: Request, res: Response) {
        try {
            const models = await scooterModelRepository.getAllScooterModels();
            res.json(models);
        } catch (error: any) {
            res.status(400).json({ 
                message: 'Erreur lors de la récupération des modèles de scooters', 
                error: error.message || 'Erreur inconnue' 
            });
        }
    }

    /**
     * Get scooter model by ID
     */
    static async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'ID invalide' });
            }

            const model = await scooterModelRepository.getScooterModelById(id);
            if (!model) {
                return res.status(404).json({ message: 'Modèle de scooter introuvable' });
            }

            res.json(model);
        } catch (error: any) {
            res.status(400).json({ 
                message: 'Erreur lors de la récupération du modèle de scooter', 
                error: error.message || 'Erreur inconnue' 
            });
        }
    }

    /**
     * Add a new scooter model
     */
    static async add(req: Request, res: Response) {
        try {
            const { name, battery_range, maintenance_interval } = req.body;

            // Validation
            if (!name || !battery_range || !maintenance_interval) {
                return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
            }

            const model = new ScooterModel(0, name, battery_range, maintenance_interval);
            const newModel = await scooterModelRepository.addScooterModel(model);

            res.status(201).json(newModel);
        } catch (error: any) {
            res.status(400).json({ 
                message: 'Erreur lors de l\'ajout du modèle de scooter', 
                error: error.message || 'Erreur inconnue' 
            });
        }
    }

    /**
     * Update an existing scooter model
     */
    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { name, battery_range, maintenance_interval } = req.body;

            if (isNaN(id)) {
                return res.status(400).json({ message: 'ID invalide' });
            }

            // Validation
            if (!name || !battery_range || !maintenance_interval) {
                return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
            }

            const model = new ScooterModel(id, name, battery_range, maintenance_interval);
            const updatedModel = await scooterModelRepository.updateScooterModel(model);

            res.json(updatedModel);
        } catch (error: any) {
            res.status(400).json({ 
                message: 'Erreur lors de la mise à jour du modèle de scooter', 
                error: error.message || 'Erreur inconnue' 
            });
        }
    }

    /**
     * Delete a scooter model by ID
     */
    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'ID invalide' });
            }

            await scooterModelRepository.deleteScooterModel(id);
            res.status(204).end();
        } catch (error: any) {
            res.status(400).json({ 
                message: 'Erreur lors de la suppression du modèle de scooter', 
                error: error.message || 'Erreur inconnue' 
            });
        }
    }
}
