import { PrismaClient } from '@prisma/postgres/client';
import { ScooterModel } from '../../domain/entities/ScooterModel';

const prisma = new PrismaClient();

export class ScooterModelRepository {
    async getAllScooterModels() {
        return await prisma.scooter_model.findMany();
    }

    async getScooterModelById(id: number) {
        return await prisma.scooter_model.findUnique({
            where: {
                id: id,
            },
        });
    }

    async addScooterModel(scooterModel: ScooterModel) {
        return await prisma.scooter_model.create({
            data: {
                name: scooterModel.getName(),
                battery_range: scooterModel.getBatteryRange(),
                maintenance_interval: scooterModel.getMaintenanceInterval(),
            },
        });
    }
}
