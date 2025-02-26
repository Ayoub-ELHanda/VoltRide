import { PrismaClient } from '@prisma/client';
import { ScooterModel } from '../../domain/entities/ScooterModel';

const prisma = new PrismaClient();

export class ScooterModelRepository {
    /**
     * Get all scooter models
     */
    async getAllScooterModels() {
        return await prisma.scooter_model.findMany();
    }

    /**
     * Get a scooter model by ID
     */
    async getScooterModelById(id: number) {
        return await prisma.scooter_model.findUnique({
            where: {
                id: id,
            },
        });
    }

    /**
     * Add a new scooter model
     */
    async addScooterModel(scooterModel: ScooterModel) {
        return await prisma.scooter_model.create({
            data: {
                name: scooterModel.getName(),
                battery_range: scooterModel.getBatteryRange(),
                maintenance_interval: scooterModel.getMaintenanceInterval(),
            },
        });
    }

    /**
     * Update an existing scooter model
     */
    async updateScooterModel(scooterModel: ScooterModel) {
        return await prisma.scooter_model.update({
            where: {
                id: scooterModel.getId(),
            },
            data: {
                name: scooterModel.getName(),
                battery_range: scooterModel.getBatteryRange(),
                maintenance_interval: scooterModel.getMaintenanceInterval(),
            },
        });
    }

    /**
     * Delete a scooter model by ID
     */
    async deleteScooterModel(id: number) {
        return await prisma.scooter_model.delete({
            where: {
                id: id,
            },
        });
    }
}
