import { Router } from 'express';
import { ScooterController } from '../controllers/ScooterController';

const router = Router();

router.get('/', ScooterController.getAll);

export default router;
