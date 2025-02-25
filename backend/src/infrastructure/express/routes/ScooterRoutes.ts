import { Router } from 'express';
import { ScooterController } from '../controllers/ScooterController';

const router = Router();

router.get('/', ScooterController.getAll);
router.post('/', (req, res) => ScooterController.add(req, res));

export default router;
