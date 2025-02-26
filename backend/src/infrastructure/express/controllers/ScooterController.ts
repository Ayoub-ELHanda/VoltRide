import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


import { ScooterRepository } from '../../orm/ScooterRepository';
import { ScooterModelRepository } from '../../orm/ScooterModelRepository';
import { GetAllScooters } from '../../../application/use-cases/scooter/GetAllScooters';
import { GetOneScooter } from '../../../application/use-cases/scooter/GetOneScooter';
import { AddScooter } from '../../../application/use-cases/scooter/AddScooter';
import { UpdateScooter } from '../../../application/use-cases/scooter/UpdateScooter';

const scooterRepository = new ScooterRepository();
const getAllScooters = new GetAllScooters(scooterRepository);
const getOneScooter = new GetOneScooter(scooterRepository);
const addScooter = new AddScooter(scooterRepository);
const updateScooter = new UpdateScooter(scooterRepository);

const prisma = new PrismaClient();
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
            const { licensePlate, status, dealerId, partnerId, scooterModelId } = req.body;
    
            // Validate scooterModelId
            if (!scooterModelId || isNaN(parseInt(scooterModelId))) {
                return res.status(400).json({ 
                    message: 'Invalid or missing scooterModelId' 
                });
            }
    
            // Check if the scooterModelId exists
            const scooterModelRepository = new ScooterModelRepository();
            const existingScooterModel = await scooterModelRepository.getScooterModelById(parseInt(scooterModelId));
    
            if (!existingScooterModel) {
                return res.status(400).json({ 
                    message: 'Invalid scooterModelId: Model does not exist' 
                });
            }
    
            // Check if the dealerId exists
            if (dealerId) {
                const dealerExists = await prisma.dealer.findUnique({
                    where: {
                        id: dealerId
                    }
                });
    
                if (!dealerExists) {
                    return res.status(400).json({ 
                        message: 'Invalid dealerId: Dealer does not exist' 
                    });
                }
            }
    
            // Check if the partnerId exists
            if (partnerId) {
                const partnerExists = await prisma.partner.findUnique({
                    where: {
                        id: partnerId
                    }
                });
    
                if (!partnerExists) {
                    return res.status(400).json({ 
                        message: 'Invalid partnerId: Partner does not exist' 
                    });
                }
            }
    
            // If everything is okay, proceed to create the scooter
            const scooter = await addScooter.execute({
                licensePlate,
                status,
                dealerId,
                partnerId,
                scooterModelId
            });
            res.status(201).json(scooter);
    
        } catch (error: any) {
            console.error("Erreur lors de l'ajout du scooter:", error);
            res.status(500).json({ 
                message: 'Erreur lors de l\'ajout du scooter', 
                error: error.message || 'Erreur inconnue' 
            });
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
