import { Request, Response } from 'express';
import { CreateScooterUseCase } from '../../../core/application/use-cases/scooter/CreateScooterUseCase';
import { GetAllScootersUseCase } from '../../../core/application/use-cases/scooter/GetAllScootersUseCase';
import { GetScooterByIdUseCase } from '../../../core/application/use-cases/scooter/GetScooterByIdUseCase';
import { IUnitOfWork } from '../../../core/application/interfaces/IUnitOfWork';
import { INotificationService } from '../../../core/application/interfaces/INotificationService';

/**
 * Express controller for scooter-related endpoints
 */
export class ScooterController {
  private readonly unitOfWork: IUnitOfWork;
  private readonly notificationService: INotificationService;

  /**
   * Constructor
   * @param unitOfWork The unit of work
   * @param notificationService The notification service
   */
  constructor(unitOfWork: IUnitOfWork, notificationService: INotificationService) {
    this.unitOfWork = unitOfWork;
    this.notificationService = notificationService;
  }

  /**
   * Gets all scooters
   * @param req The request
   * @param res The response
   */
  async getAllScooters(req: Request, res: Response): Promise<void> {
    try {
      const getAllScootersUseCase = new GetAllScootersUseCase(this.unitOfWork);
      const scooters = await getAllScootersUseCase.execute();
      res.json(scooters);
    } catch (error: any) {
      res.status(500).json({
        message: 'Erreur lors de la récupération des scooters',
        error: error.message || 'Erreur inconnue'
      });
    }
  }

  /**
   * Gets a scooter by ID
   * @param req The request
   * @param res The response
   */
  async getScooterById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID de scooter invalide' });
        return;
      }

      const getScooterByIdUseCase = new GetScooterByIdUseCase(this.unitOfWork);
      const scooter = await getScooterByIdUseCase.execute(id);

      if (!scooter) {
        res.status(404).json({ message: `Scooter avec l'ID ${id} non trouvé` });
        return;
      }

      res.json(scooter);
    } catch (error: any) {
      res.status(500).json({
        message: 'Erreur lors de la récupération du scooter',
        error: error.message || 'Erreur inconnue'
      });
    }
  }

  /**
   * Creates a new scooter
   * @param req The request
   * @param res The response
   */
  async createScooter(req: Request, res: Response): Promise<void> {
    try {
      const { licensePlate, status, dealerId, partnerId, scooterModelId } = req.body;

      // Validate required fields
      if (!licensePlate || !status || !scooterModelId) {
        res.status(400).json({
          message: 'Champs obligatoires manquants: licensePlate, status, scooterModelId'
        });
        return;
      }

      const createScooterUseCase = new CreateScooterUseCase(this.unitOfWork);
      const scooter = await createScooterUseCase.execute({
        licensePlate,
        status,
        dealerId: dealerId ? parseInt(dealerId) : undefined,
        partnerId: partnerId ? parseInt(partnerId) : undefined,
        scooterModelId: parseInt(scooterModelId)
      });

      // Send notification about the new scooter
      try {
        await this.notificationService.sendEmail(
          'admin@voltride.com',
          'Nouveau scooter ajouté',
          `Un nouveau scooter avec la plaque d'immatriculation ${licensePlate} a été ajouté.`
        );
      } catch (notificationError) {
        // Log the error but don't fail the operation
        console.error('Failed to send notification:', notificationError);
      }

      res.status(201).json(scooter);
    } catch (error: any) {
      res.status(500).json({
        message: 'Erreur lors de la création du scooter',
        error: error.message || 'Erreur inconnue'
      });
    }
  }

  /**
   * Updates a scooter
   * @param req The request
   * @param res The response
   */
  async updateScooter(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID de scooter invalide' });
        return;
      }

      // Get the scooter first to check if it exists
      const getScooterByIdUseCase = new GetScooterByIdUseCase(this.unitOfWork);
      const existingScooter = await getScooterByIdUseCase.execute(id);

      if (!existingScooter) {
        res.status(404).json({ message: `Scooter avec l'ID ${id} non trouvé` });
        return;
      }

      // TODO: Implement UpdateScooterUseCase and use it here
      res.status(501).json({ message: 'Non implémenté' });
    } catch (error: any) {
      res.status(500).json({
        message: 'Erreur lors de la mise à jour du scooter',
        error: error.message || 'Erreur inconnue'
      });
    }
  }

  /**
   * Deletes a scooter
   * @param req The request
   * @param res The response
   */
  async deleteScooter(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID de scooter invalide' });
        return;
      }

      // Get the scooter first to check if it exists
      const getScooterByIdUseCase = new GetScooterByIdUseCase(this.unitOfWork);
      const existingScooter = await getScooterByIdUseCase.execute(id);

      if (!existingScooter) {
        res.status(404).json({ message: `Scooter avec l'ID ${id} non trouvé` });
        return;
      }

      // TODO: Implement DeleteScooterUseCase and use it here
      res.status(501).json({ message: 'Non implémenté' });
    } catch (error: any) {
      res.status(500).json({
        message: 'Erreur lors de la suppression du scooter',
        error: error.message || 'Erreur inconnue'
      });
    }
  }
}
