import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceController } from './maintenance.controller';
import { PrismaClient } from '@prisma/client';

// 💡 Mock de PrismaClient
// On remplace les méthodes réelles de Prisma par des mocks pour éviter d'interagir avec la vraie base de données.
// Cela rend les tests plus rapides et indépendants des changements dans la base de données.
jest.mock('@prisma/client', () => {
  // Création d'un objet simulé pour PrismaClient
  const mockPrisma = {
    maintenance: {
      // Mock de la méthode `findMany()` pour retourner une liste fictive de maintenances
      findMany: jest.fn().mockResolvedValue([
        {
          id: 1,
          technician_name: 'Jane Doe',
          type: 'préventive',
          status: 'planifiée',
          date_planned: new Date(),
          cost: 120.75,
          comment: 'Vérification des freins',
          scooter_id: 1,
        },
      ]),
      // Mock de la méthode `findUnique()` pour retourner un objet fictif correspondant à un ID spécifique
      findUnique: jest.fn().mockResolvedValue({
        id: 1,
        technician_name: 'Jane Doe',
        type: 'préventive',
        status: 'planifiée',
        date_planned: new Date(),
        cost: 120.75,
        comment: 'Vérification des freins',
        scooter_id: 1,
      }),
      // Mock de la méthode `create()` pour simuler l'ajout d'une maintenance
      create: jest.fn().mockResolvedValue({
        id: 1,
        technician_name: 'Jane Doe',
        type: 'préventive',
        status: 'planifiée',
        date_planned: new Date(),
        cost: 120.75,
        comment: 'Vérification des freins',
        scooter_id: 1,
      }),
    },
  };

  // On retourne un PrismaClient simulé avec les méthodes mockées
  return {
    PrismaClient: jest.fn(() => mockPrisma),
  };
});

describe('MaintenanceController', () => {
  let controller: MaintenanceController;
  let prisma: PrismaClient;

  // 💡 Initialisation avant chaque test
  beforeEach(async () => {
    prisma = new PrismaClient();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceController],
      providers: [
        {
          provide: PrismaClient,
          useValue: prisma, // On utilise le PrismaClient mocké défini ci-dessus
        },
      ],
    }).compile();

    // On récupère une instance du controller à tester
    controller = module.get<MaintenanceController>(MaintenanceController);
  });

  // 💡 Test pour vérifier que le controller est bien défini
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // 💡 Test pour la méthode `getAll()` qui récupère toutes les maintenances
  it('should get all maintenances', async () => {
    // Appel de la méthode `getAll()` du controller
    const result = await controller.getAll();

    // Vérification que le résultat est un tableau
    expect(result).toBeInstanceOf(Array);

    // Vérification que le premier élément du tableau a bien une propriété `id`
    expect(result[0]).toHaveProperty('id');

    // Vérification que la méthode Prisma `findMany()` a bien été appelée
    expect(prisma.maintenance.findMany).toHaveBeenCalled();
  });

  // 💡 Test pour la méthode `getById()` qui récupère une maintenance par son ID
  it('should get a maintenance by ID', async () => {
    // Appel de la méthode `getById()` avec un ID spécifique
    const result = await controller.getById(1);

    // Vérification que le résultat n'est pas null
    if (result) {
      // Vérification que le résultat contient un `id`
      expect(result).toHaveProperty('id');

      // Vérification que le `technician_name` correspond à ce qui est attendu
      expect(result.technician_name).toBe('Jane Doe');
    } else {
      // Si le résultat est null, le test échoue
      fail('Expected result to be non-null');
    }

    // Vérification que la méthode Prisma `findUnique()` a bien été appelée avec le bon paramètre
    expect(prisma.maintenance.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  // 💡 Test pour la méthode `create()` qui crée une nouvelle maintenance
  it('should create a maintenance', async () => {
    // Définition d'un objet de nouvelle maintenance à créer
    const newMaintenance = {
      technician_name: 'Jane Doe',
      type: 'préventive',
      status: 'planifiée',
      date_planned: new Date(),
      date_completed: null, // 👈 Ajouté pour correspondre à l'objet reçu
      cost: 120.75,
      comment: 'Vérification des freins',
      scooter_id: 1
    };

    // Appel de la méthode `create()` du controller avec l'objet défini ci-dessus
    const result = await controller.create(newMaintenance);

    // Vérification que le résultat contient un `id`
    expect(result).toHaveProperty('id');

    // Vérification que le `technician_name` correspond à ce qui est attendu
    expect(result.technician_name).toBe(newMaintenance.technician_name);

    // Vérification que la méthode Prisma `create()` a bien été appelée avec le bon paramètre
    expect(prisma.maintenance.create).toHaveBeenCalledWith({
      data: newMaintenance,
    });
  });
});
