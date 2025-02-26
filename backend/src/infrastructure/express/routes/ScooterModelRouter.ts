import { Router } from 'express';
import { ScooterModelController } from '../controllers/ScooterModelController';


const router = Router();

router.get('/', ScooterModelController.getAll);
router.get('/:id', (req, res) => ScooterModelController.getById(req, res));
router.post('/', (req, res) => ScooterModelController.add(req, res));
router.put('/:id', (req, res) => ScooterModelController.update(req, res));
router.delete('/:id', (req, res) => ScooterModelController.delete(req, res));

export default router;
