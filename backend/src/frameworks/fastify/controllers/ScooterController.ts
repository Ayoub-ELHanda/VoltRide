import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateScooterUseCase } from '../../../core/application/use-cases/scooter/CreateScooterUseCase';
import { GetAllScootersUseCase } from '../../../core/application/use-cases/scooter/GetAllScootersUseCase';
import { GetScooterByIdUseCase } from '../../../core/application/use-cases/scooter/GetScooterByIdUseCase';
import { IUnitOfWork } from '../../../core/application/interfaces/IUnitOfWork';
import { INotificationService } from '../../../core/application/interfaces/INotificationService';

/**
 * Fastify controller for scooter-related endpoints
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

    // Bind methods to ensure 'this' context is preserved
    this.getAllScooters = this.getAllScooters.bind(this);
    this.getScooterById = this.getScooterById.bind(this);
    this.createScooter = this.createScooter.bind(this);
    this.updateScooter = this.updateScooter.bind(this);
    this.deleteScooter = this.deleteScooter.bind(this);
  }

  /**
   * Gets all scooters
   * @param request The request
   * @param reply The reply
   */
  async getAllScooters(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const getAllScootersUseCase = new GetAllScootersUseCase(this.unitOfWork);
      const scooters = await getAllScootersUseCase.execute();
      reply.send(scooters);
    } catch (error: any) {
      reply.status(500).send({
        message: 'Erreur lors de la récupération des scooters',
        error: error.message || 'Erreur inconnue'
      });
    }
  }

  /**
   * Gets a scooter by ID
   * @param request The request
   * @param reply The reply
   */
  async getScooterById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        reply.status(400).send({ message: 'ID de scooter invalide' });
        return;
      }

      const getScooterByIdUseCase = new GetScooterByIdUseCase(this.unitOfWork);
      const scooter = await getScooterByIdUseCase.execute(id);

      if (!scooter) {
        reply.status(404).send({ message: `Scooter avec l'ID ${id} non trouvé` });
        return;
      }

      reply.send(scooter);
    } catch (error: any) {
      reply.status(500).send({
        message: 'Erreur lors de la récupération du scooter',
        error: error.message || 'Erreur inconnue'
      });
    }
  }

  /**
   * Creates a new scooter
   * @param request The request
   * @param reply The reply
   */
  async createScooter(request: FastifyRequest<{ Body: { licensePlate: string; status: string; dealerId?: string; partnerId?: string; scooterModelId: string } }>, reply: FastifyReply): Promise<void> {
    try {
      const { licensePlate, status, dealerId, partnerId, scooterModelId } = request.body;

      // Validate required fields
      if (!licensePlate || !status || !scooterModelId) {
        reply.status(400).send({
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

      reply.status(201).send(scooter);
    } catch (error: any) {
      reply.status(500).send({
        message: 'Erreur lors de la création du scooter',
        error: error.message || 'Erreur inconnue'
      });
    }
  }

  /**
   * Updates a scooter
   * @param request The request
   * @param reply The reply
   */
  async updateScooter(request: FastifyRequest<{ Params: { id: string }; Body: { licensePlate?: string; status?: string; dealerId?: string; partnerId?: string; scooterModelId?: string } }>, reply: FastifyReply): Promise<void> {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        reply.status(400).send({ message: 'ID de scooter invalide' });
        return;
      }

      // Get the scooter first to check if it exists
      const getScooterByIdUseCase = new GetScooterByIdUseCase(this.unitOfWork);
      const existingScooter = await getScooterByIdUseCase.execute(id);

      if (!existingScooter) {
        reply.status(404).send({ message: `Scooter avec l'ID ${id} non trouvé` });
        return;
      }

      // TODO: Implement UpdateScooterUseCase and use it here
      reply.status(501).send({ message: 'Non implémenté' });
    } catch (error: any) {
      reply.status(500).send({
        message: 'Erreur lors de la mise à jour du scooter',
        error: error.message || 'Erreur inconnue'
      });
    }
  }

  /**
   * Deletes a scooter
   * @param request The request
   * @param reply The reply
   */
  async deleteScooter(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        reply.status(400).send({ message: 'ID de scooter invalide' });
        return;
      }

      // Get the scooter first to check if it exists
      const getScooterByIdUseCase = new GetScooterByIdUseCase(this.unitOfWork);
      const existingScooter = await getScooterByIdUseCase.execute(id);

      if (!existingScooter) {
        reply.status(404).send({ message: `Scooter avec l'ID ${id} non trouvé` });
        return;
      }

      // TODO: Implement DeleteScooterUseCase and use it here
      reply.status(501).send({ message: 'Non implémenté' });
    } catch (error: any) {
      reply.status(500).send({
        message: 'Erreur lors de la suppression du scooter',
        error: error.message || 'Erreur inconnue'
      });
    }
  }
}
