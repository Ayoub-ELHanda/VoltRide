import { PrismaClient } from '@prisma/postgres/client';

const prisma = new PrismaClient();

export class ScooterRepository {
    async getAllScooters() {
        return await prisma.scooter.findMany({
            include: {
                scooters_models: true,
            },
        });
    }
}
