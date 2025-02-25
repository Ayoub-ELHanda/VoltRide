import { Router } from 'express';
import { MaintenanceController } from '../../maintenance/maintenance.controller';

// ✅ Create Router
const router = Router();

// ✅ Initialize Maintenance Controller
const maintenanceController = new MaintenanceController();

// ✅ Define Routes
router.get('/maintenances', (req, res) => maintenanceController.getAll().then(result => res.json(result)));
router.get('/maintenances/:id', (req, res) => maintenanceController.getById(parseInt(req.params.id)).then(result => res.json(result)));
router.post('/maintenances', (req, res) => maintenanceController.create(req.body).then(result => res.json(result)));
router.patch('/maintenances/:id', (req, res) => maintenanceController.update(parseInt(req.params.id), req.body).then(result => res.json(result)));
router.delete('/maintenances/:id', (req, res) => maintenanceController.delete(parseInt(req.params.id)).then(result => res.json(result)));

// ✅ Default Export
export default router;
