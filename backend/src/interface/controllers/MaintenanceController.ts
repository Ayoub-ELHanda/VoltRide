import { Request, Response } from 'express';
import { MaintenanceRepository } from '../../infrastructure/orm/MaintenanceRepository';
import { AddMaintenance } from '../../application/use-cases/maintenance/AddMaintenance';
import { UpdateMaintenance } from '../../application/use-cases/maintenance/UpdateMaintenance';
import { DeleteMaintenance } from '../../application/use-cases/maintenance/DeleteMaintenance';
import { GetAllMaintenances } from '../../application/use-cases/maintenance/GetAllMaintenances';
import { GetMaintenanceById } from '../../application/use-cases/maintenance/GetMaintenanceById';

const maintenanceRepository = new MaintenanceRepository();

export class MaintenanceController {
    static async add(req: Request, res: Response) {
        const addMaintenance = new AddMaintenance(maintenanceRepository);
        const maintenance = await addMaintenance.execute(req.body);
        res.status(201).json(maintenance);
    }

    static async update(req: Request, res: Response) {
        const updateMaintenance = new UpdateMaintenance(maintenanceRepository);
        const maintenance = await updateMaintenance.execute({
            id: parseInt(req.params.id),
            ...req.body
        });
        res.json(maintenance);
    }

    static async delete(req: Request, res: Response) {
        const deleteMaintenance = new DeleteMaintenance(maintenanceRepository);
        await deleteMaintenance.execute(parseInt(req.params.id));
        res.status(204).end();
    }

    static async getAll(req: Request, res: Response) {
        const getAllMaintenances = new GetAllMaintenances(maintenanceRepository);
        const maintenances = await getAllMaintenances.execute();
        res.json(maintenances);
    }

    static async getById(req: Request, res: Response) {
        const getMaintenanceById = new GetMaintenanceById(maintenanceRepository);
        const maintenance = await getMaintenanceById.execute(parseInt(req.params.id));
        res.json(maintenance);
    }
}
