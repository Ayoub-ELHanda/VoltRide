import { Scooter, ScooterStatus } from '../../../domain/entities/Scooter';
import { IScooterRepository } from '../../../domain/repositories/IScooterRepository';
import { IScooterModelRepository } from '../../../domain/repositories/IScooterModelRepository';
import { CreateScooterDTO, ScooterDTO } from '../../dtos/ScooterDTO';
import { IUnitOfWork } from '../../interfaces/IUnitOfWork';

/**
 * Use case for creating a new scooter
 * Following the Clean Architecture principles, this use case depends on the repository interfaces
 * and not on the concrete implementations.
 */
export class CreateScooterUseCase {
  private readonly scooterRepository: IScooterRepository;
  private readonly scooterModelRepository: IScooterModelRepository;

  /**
   * Constructor
   * @param unitOfWork The unit of work
   */
  constructor(private readonly unitOfWork: IUnitOfWork) {
    this.scooterRepository = unitOfWork.getScooterRepository();
    this.scooterModelRepository = unitOfWork.getScooterModelRepository();
  }

  /**
   * Executes the use case
   * @param data The data for creating a new scooter
   * @returns A promise that resolves to the created scooter DTO
   */
  async execute(data: CreateScooterDTO): Promise<ScooterDTO> {
    try {
      // Begin transaction
      await this.unitOfWork.beginTransaction();

      // Get the scooter model
      const scooterModel = await this.scooterModelRepository.getScooterModelById(data.scooterModelId);
      if (!scooterModel) {
        throw new Error(`Scooter model with ID ${data.scooterModelId} not found.`);
      }

      // Create a new scooter entity
      // Note: We're using 0 as a temporary ID, the actual ID will be assigned by the repository
      const scooter = new Scooter(
        0,
        data.licensePlate,
        data.status,
        scooterModel,
        data.dealerId,
        data.partnerId
      );

      // Save the scooter
      const savedScooter = await this.scooterRepository.addScooter(scooter);

      // Commit transaction
      await this.unitOfWork.commitTransaction();

      // Map the domain entity to a DTO
      return {
        id: savedScooter.getId(),
        licensePlate: savedScooter.getLicensePlate(),
        status: savedScooter.getStatus(),
        dealerId: savedScooter.getDealerId(),
        partnerId: savedScooter.getPartnerId(),
        scooterModelId: savedScooter.getScooterModel().getId(),
        lastMaintenanceDate: savedScooter.getLastMaintenanceDate()?.toISOString()
      };
    } catch (error) {
      // Rollback transaction in case of error
      await this.unitOfWork.rollbackTransaction();
      throw error;
    }
  }
}
