import { PrismaClient } from '@prisma/postgres/client';
import { Scooter } from '../../domain/entities/Scooter';
import { ScooterModel } from '../../domain/entities/ScooterModel';

const prisma = new PrismaClient();

export class ScooterRepository {
    async getAllScooters() {
        return await prisma.scooter.findMany({
            include: {
                scooters_models: true,
            },
        });
    }

    async addScooter(scooter: Scooter) {
        return await prisma.scooter.create({
            data: {
                license_plate: scooter.getLicensePlate(),
                status: scooter.getStatus(),
                dealer_id: scooter.getDealerId(),
                partner_id: scooter.getPartnerId(),
                scooter_model_id: scooter.getScooterModel().getId(),
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
