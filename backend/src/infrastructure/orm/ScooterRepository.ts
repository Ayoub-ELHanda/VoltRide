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

    async getScooterById(id: number) {
        return await prisma.scooter.findUnique({
            where: {
                id: id,
            },
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

    async updateScooter(scooter: Scooter) {
        return await prisma.scooter.update({
            where: {
                id: scooter.getId(),
            },
            data: {
                license_plate: scooter.getLicensePlate(),
                status: scooter.getStatus(),
                dealer_id: scooter.getDealerId(),
                partner_id: scooter.getPartnerId(),
                scooter_model_id: scooter.getScooterModel().getId(),
            },
        });
    }

    async deleteScooter(id: number) {
        return await prisma.scooter.delete({
            where: {
                id: id,
            },
        });
    }
}
