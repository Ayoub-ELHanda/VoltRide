import { Maintenance, MaintenanceType } from '../../../domain/entities/Maintenance';
import { IMaintenanceRepository } from '../../../domain/repositories/IMaintenanceRepository';
import { IScooterRepository } from '../../../domain/repositories/IScooterRepository';
import { CreateMaintenanceDTO, MaintenanceDTO } from '../../dtos/MaintenanceDTO';
import { IUnitOfWork } from '../../interfaces/IUnitOfWork';
import { INotificationService } from '../../interfaces/INotificationService';

/**
 * Use case for creating a new maintenance record
 * Following the Clean Architecture principles, this use case depends on the repository interfaces
 * and not on the concrete implementations.
 */
export class CreateMaintenanceUseCase {
  private readonly maintenanceRepository: IMaintenanceRepository;
  private readonly scooterRepository: IScooterRepository;

  /**
   * Constructor
   * @param unitOfWork The unit of work
   * @param notificationService The notification service
   */
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly notificationService: INotificationService
  ) {
    this.maintenanceRepository = unitOfWork.getMaintenanceRepository();
    this.scooterRepository = unitOfWork.getScooterRepository();
  }

  /**
   * Executes the use case
   * @param data The data for creating a new maintenance record
   * @returns A promise that resolves to the created maintenance DTO
   */
  async execute(data: CreateMaintenanceDTO): Promise<MaintenanceDTO> {
    try {
      // Begin transaction
      await this.unitOfWork.beginTransaction();

      // Check if the scooter exists
      const scooter = await this.scooterRepository.getScooterById(data.scooterId);
      if (!scooter) {
        throw new Error(`Scooter with ID ${data.scooterId} not found.`);
      }

      // Create a new maintenance entity
      const maintenance = new Maintenance(
        data.type,
        new Date(data.date),
        data.cost,
        data.comment || '',
        data.technicianName,
        data.scooterId
      );

      // Add parts if provided
      if (data.parts && data.parts.length > 0) {
        for (const part of data.parts) {
          // Ensure the part has an ID (required by the domain entity)
          maintenance.addPart({
            id: part.id || 0, // Use 0 as default if id is undefined
            name: part.name,
            price: part.price,
            quantity: part.quantity
          });
        }
      }

      // Save the maintenance record
      const savedMaintenance = await this.maintenanceRepository.addMaintenance(maintenance);

      // If this is a preventive maintenance, update the scooter's last maintenance date
      if (maintenance.isPreventive()) {
        scooter.completeMaintenanceAndMakeAvailable(new Date(data.date));
        await this.scooterRepository.updateScooter(scooter);
      }

      // Commit transaction
      await this.unitOfWork.commitTransaction();

      // Send notification about the maintenance
      try {
        const maintenanceType = maintenance.isPreventive() ? 'préventive' : 'corrective';
        const message = `Une maintenance ${maintenanceType} a été effectuée sur le scooter ${scooter.getLicensePlate()} le ${new Date(data.date).toLocaleDateString()}.`;
        
        // This would typically be sent to an admin or manager
        await this.notificationService.sendEmail(
          'admin@voltride.com',
          `Maintenance ${maintenanceType} effectuée`,
          message
        );
      } catch (notificationError) {
        // Log the error but don't fail the operation
        console.error('Failed to send maintenance notification:', notificationError);
      }

      // Map the domain entity to a DTO
      return {
        id: savedMaintenance.getId(),
        type: savedMaintenance.getType(),
        date: savedMaintenance.getDate().toISOString(),
        cost: savedMaintenance.getCost(),
        comment: savedMaintenance.getComment(),
        technicianName: savedMaintenance.getTechnicianName(),
        scooterId: savedMaintenance.getScooterId(),
        parts: savedMaintenance.getParts()
      };
    } catch (error) {
      // Rollback transaction in case of error
      await this.unitOfWork.rollbackTransaction();
      throw error;
    }
  }
}
