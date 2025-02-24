import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.notifications.deleteMany({});
  await prisma.maintenances.deleteMany({});
  await prisma.scooters.deleteMany({});
  await prisma.scooters_models.deleteMany({});

  // Seed Scooters Models
  const model1 = await prisma.scooters_models.create({
    data: {
      name: 'City 45',
      battery_range: 50,
      maintenance_interval: 6
    }
  });

  const model2 = await prisma.scooters_models.create({
    data: {
      name: 'Pro 60',
      battery_range: 80,
      maintenance_interval: 12
    }
  });

  // Seed Scooters
  const scooter1 = await prisma.scooters.create({
    data: {
      license_plate: 'AB123CD',
      status: 'available',
      scooter_model_id: model1.id
    }
  });

  const scooter2 = await prisma.scooters.create({
    data: {
      license_plate: 'EF456GH',
      status: 'in_maintenance',
      scooter_model_id: model2.id
    }
  });

  // Seed Maintenances
  const maintenance1 = await prisma.maintenances.create({
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

  const maintenance2 = await prisma.maintenances.create({
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
  await prisma.notifications.create({
    data: {
      message: 'Maintenance planifiée pour le scooter AB123CD',
      maintenance_id: maintenance1.id
    }
  });

  await prisma.notifications.create({
    data: {
      message: 'Réparation en cours pour le scooter EF456GH',
      maintenance_id: maintenance2.id
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
