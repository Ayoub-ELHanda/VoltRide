import { PrismaService } from './PrismaService';
import { Maintenance } from '../../domain/entities/Maintenance';

export class MaintenanceRepository {
    private prisma = PrismaService.getClient();

    /**
     * Adds a new Maintenance record after validating the scooter_id
     * @param maintenance Maintenance object containing all details
     * @returns Newly created Maintenance record
     */
    async addMaintenance(maintenance: Maintenance) {
        // Validate if the scooter_id exists
        const scooterId = maintenance.getScooterId();
        if (!scooterId) {
            throw new Error('Invalid or missing scooter_id');
        }
        
        const scooterExists = await this.prisma.scooter.findUnique({
            where: {
                id: scooterId,
            }
        });
        

        if (!scooterExists) {
            throw new Error(`Scooter with id ${maintenance.getScooterId()} does not exist.`);
        }

        // Proceed to create the maintenance record if the scooter exists
        return await this.prisma.maintenance.create({
            data: {
                type: maintenance.getType(),
                date: maintenance.getDate(),
                cost: maintenance.getCost(),
                comment: maintenance.getComment(),
                technician_name: maintenance.getTechnicianName(),
                scooter_id: maintenance.getScooterId()
            }
        });
    }

    /**
     * Updates an existing Maintenance record after validating the scooter_id
     * @param maintenance Maintenance object containing updated details
     * @returns Updated Maintenance record
     */
    async updateMaintenance(maintenance: Maintenance) {
        // Validate if the scooter_id exists
        const scooterExists = await this.prisma.scooter.findUnique({
            where: {
                id: maintenance.getScooterId()
            }
        });

        if (!scooterExists) {
            throw new Error(`Scooter with id ${maintenance.getScooterId()} does not exist.`);
        }

        // Proceed to update the maintenance record
        return await this.prisma.maintenance.update({
            where: { id: maintenance.getId() },
            data: {
                type: maintenance.getType(),
                date: maintenance.getDate(),
                cost: maintenance.getCost(),
                comment: maintenance.getComment(),
                technician_name: maintenance.getTechnicianName(),
                scooter_id: maintenance.getScooterId()
            }
        });
    }

    /**
     * Deletes a Maintenance record by its ID
     * @param id Maintenance ID
     * @returns Deleted Maintenance record
     */
    async deleteMaintenance(id: number) {
        return await this.prisma.maintenance.delete({
            where: { id }
        });
    }

    /**
     * Retrieves all Maintenance records
     * @returns Array of Maintenance records
     */
    async getAllMaintenances() {
        return await this.prisma.maintenance.findMany();
    }

    /**
     * Retrieves a Maintenance record by its ID
     * @param id Maintenance ID
     * @returns Maintenance record if found, null otherwise
     */
    async getMaintenanceById(id: number) {
        return await this.prisma.maintenance.findUnique({
            where: { id }
        });
    }
}
