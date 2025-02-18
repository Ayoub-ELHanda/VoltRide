import { Router } from 'express';
import { InMemoryScooterRepository } from '../../infrastructure/persistence/InMemoryScooterRepository';
import { ScooterService } from '../../application/services/ScooterService';
import { Scooter } from '../../domain/entities/Scooter';
import { ScooterModel } from '../../domain/entities/ScooterModel';

const router = Router();
const scooterRepository = new InMemoryScooterRepository();
const scooterService = new ScooterService(scooterRepository);

const scooter1 = new Scooter(
    '1',
    'AB-123-CD',
    'AVAILABLE',
    '1',
    '1',
    new ScooterModel('1', 'SM1', 50, 30)
);
const scooter2 = new Scooter(
    '2',
    'EF-456-GH',
    'MAINTENANCE',
    '2',
    '2',
    new ScooterModel('2', 'SM2', 40, 20)
);

scooterService.createScooter(scooter1);
scooterService.createScooter(scooter2);

router.get('/', async (req, res) => {
    const scooters = await scooterService.getAllScooters();
    res.json(scooters);
});

router.get('/:id', async (req, res) => {
    const scooter = await scooterService.getScooterById(req.params.id);
    if (!scooter) {
        return res.status(404).json({ message: "Scooter introuvable" });
    }
    res.json(scooter);
});

export default router;
