import { IScooterRepository } from '../../../domain/repositories/IScooterRepository';
import { ScooterDTO } from '../../dtos/ScooterDTO';
import { IUnitOfWork } from '../../interfaces/IUnitOfWork';

/**
 * Use case for getting a scooter by ID
 * Following the Clean Architecture principles, this use case depends on the repository interface
 * and not on the concrete implementation.
 */
export class GetScooterByIdUseCase {
  private readonly scooterRepository: IScooterRepository;

  /**
   * Constructor
   * @param unitOfWork The unit of work
   */
  constructor(private readonly unitOfWork: IUnitOfWork) {
    this.scooterRepository = unitOfWork.getScooterRepository();
  }

  /**
   * Executes the use case
   * @param id The ID of the scooter to get
   * @returns A promise that resolves to a scooter DTO or null if not found
   */
  async execute(id: number): Promise<ScooterDTO | null> {
    const scooter = await this.scooterRepository.getScooterById(id);
    
    if (!scooter) {
      return null;
    }
    
    // Map the domain entity to a DTO
    return {
      id: scooter.getId(),
      licensePlate: scooter.getLicensePlate(),
      status: scooter.getStatus(),
      dealerId: scooter.getDealerId(),
      partnerId: scooter.getPartnerId(),
      scooterModelId: scooter.getScooterModel().getId(),
      lastMaintenanceDate: scooter.getLastMaintenanceDate()?.toISOString()
    };
  }
}
