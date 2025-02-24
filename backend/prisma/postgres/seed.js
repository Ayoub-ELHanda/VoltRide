"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/postgres/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Clear existing data
        yield prisma.notifications.deleteMany({});
        yield prisma.maintenances.deleteMany({});
        yield prisma.scooters.deleteMany({});
        yield prisma.scooters_models.deleteMany({});
        // Seed Scooters Models
        const model1 = yield prisma.scooters_models.create({
            data: {
                name: 'City 45',
                battery_range: 50,
                maintenance_interval: 6
            }
        });
        const model2 = yield prisma.scooters_models.create({
            data: {
                name: 'Pro 60',
                battery_range: 80,
                maintenance_interval: 12
            }
        });
        // Seed Scooters
        const scooter1 = yield prisma.scooters.create({
            data: {
                license_plate: 'AB123CD',
                status: 'available',
                scooter_model_id: model1.id
            }
        });
        const scooter2 = yield prisma.scooters.create({
            data: {
                license_plate: 'EF456GH',
                status: 'in_maintenance',
                scooter_model_id: model2.id
            }
        });
        // Seed Maintenances
        const maintenance1 = yield prisma.maintenances.create({
            data: {
                technician_name: 'John Doe',
                type: 'préventive',
                status: 'planifiée',
                date_planned: new Date('2025-03-01T10:00:00.000Z'),
                cost: 50.00,
                comment: 'Vérification de la batterie',
                scooter_id: scooter1.id
            }
        });
        const maintenance2 = yield prisma.maintenances.create({
            data: {
                technician_name: 'Jane Smith',
                type: 'corrective',
                status: 'en cours',
                date_planned: new Date('2025-02-20T08:30:00.000Z'),
                cost: 100.00,
                comment: 'Réparation des freins',
                scooter_id: scooter2.id
            }
        });
        // Seed Notifications
        yield prisma.notifications.create({
            data: {
                message: 'Maintenance planifiée pour le scooter AB123CD',
                maintenance_id: maintenance1.id
            }
        });
        yield prisma.notifications.create({
            data: {
                message: 'Réparation en cours pour le scooter EF456GH',
                maintenance_id: maintenance2.id
            }
        });
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
