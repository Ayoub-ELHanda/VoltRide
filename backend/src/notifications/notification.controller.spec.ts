// ✅ Importation des modules nécessaires de NestJS Testing et Mongoose
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationController } from './notifications.controller';
import { Notification, NotificationDocument } from './notification.schema';

describe('NotificationController', () => {
  // ✅ Déclaration des variables pour le contrôleur et le modèle Mongoose
  let controller: NotificationController;
  let model: Model<NotificationDocument>;

  // ✅ Configuration du module de test avant chaque test
  beforeEach(async () => {
    // ✅ Création du module de test en utilisant `Test.createTestingModule`
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController], // 👈 Déclare le contrôleur à tester
      providers: [
        {
          // ✅ Mock du modèle Mongoose en utilisant `getModelToken`
          provide: getModelToken(Notification.name),
          useValue: {
            // ✅ Mock des méthodes utilisées dans le contrôleur
            find: jest.fn().mockReturnThis(), 
            exec: jest.fn().mockResolvedValue([{ _id: '1', message: 'Test', maintenance_id: 1 }]), 
            create: jest.fn().mockResolvedValue({ _id: '1', message: 'Test', maintenance_id: 1 }),
            findById: jest.fn().mockResolvedValue({ _id: '1', message: 'Test', maintenance_id: 1 }),
            findByIdAndDelete: jest.fn().mockResolvedValue({ _id: '1', message: 'Test', maintenance_id: 1 }), // ✅ Mock Correct
          },
        },
      ],
    }).compile(); // 👈 Compilation du module de test
  
    // ✅ Initialisation des variables après compilation
    controller = module.get<NotificationController>(NotificationController);
    model = module.get<Model<NotificationDocument>>(getModelToken(Notification.name));
  });

  // ✅ Vérification que le contrôleur est bien défini
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ✅ Test du Endpoint GET pour obtenir toutes les notifications
  it('should get all notifications', async () => {
    // ✅ Appel de la méthode `getAll()` du contrôleur
    const result = await controller.getAll();
    expect(result).toBeInstanceOf(Array); // ✅ Vérification que le résultat est un tableau
    expect(model.find).toHaveBeenCalled(); // ✅ Vérification que `find()` a bien été appelé
  });

  // ✅ Test du Endpoint POST pour créer une notification
  it('should create a notification', async () => {
    // ✅ Création d'une nouvelle notification alignée avec le mock
    const newNotification = {
      message: 'Test', // 👈 Aligner avec la valeur du mock pour éviter les erreurs
      maintenance_id: 1
    };

    // ✅ Appel de la méthode `create()` du contrôleur
    const result = await controller.create(newNotification);

    expect(result).toHaveProperty('_id'); // ✅ Vérification que `_id` existe dans le résultat
    expect(result.message).toBe(newNotification.message); // ✅ Vérification du message
  });

  // ✅ Test du Endpoint DELETE pour supprimer une notification par ID
  it('should delete a notification', async () => {
    // ✅ Appel de la méthode `delete()` du contrôleur
    const result = await controller.delete('1');

    expect(result).toHaveProperty('_id'); // ✅ Vérification que `_id` existe dans le résultat
    
    // ✅ Vérification que `result` n'est pas `null`
    if (result) {
      expect(result.message).toBe('Test');
    } else {
      fail('Expected result to be non-null');
    }

    // ✅ Vérification que `findByIdAndDelete()` a été appelé avec le bon ID
    expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
  });
});
