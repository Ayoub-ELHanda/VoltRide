import { Router } from 'express';
import { ScooterController } from '../controllers/ScooterController';

const router = Router();

router.get('/', ScooterController.getAll);
router.get('/:id', (req, res) => ScooterController.getById(req, res));
router.post('/', (req, res) => ScooterController.add(req, res));
router.put('/:id', (req, res) => ScooterController.update(req, res));
router.delete('/:id', (req, res) => ScooterController.delete(req, res));

export default router;
