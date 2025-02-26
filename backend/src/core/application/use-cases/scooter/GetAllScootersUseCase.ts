import { IScooterRepository } from '../../../domain/repositories/IScooterRepository';
import { ScooterDTO } from '../../dtos/ScooterDTO';
import { IUnitOfWork } from '../../interfaces/IUnitOfWork';

/**
 * Use case for getting all scooters
 * Following the Clean Architecture principles, this use case depends on the repository interface
 * and not on the concrete implementation.
 */
export class GetAllScootersUseCase {
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
   * @returns A promise that resolves to an array of scooter DTOs
   */
  async execute(): Promise<ScooterDTO[]> {
    const scooters = await this.scooterRepository.getAllScooters();
    
    // Map the domain entities to DTOs
    return scooters.map(scooter => ({
      id: scooter.getId(),
      licensePlate: scooter.getLicensePlate(),
      status: scooter.getStatus(),
      dealerId: scooter.getDealerId(),
      partnerId: scooter.getPartnerId(),
      scooterModelId: scooter.getScooterModel().getId(),
      lastMaintenanceDate: scooter.getLastMaintenanceDate()?.toISOString()
    }));
  }
}
