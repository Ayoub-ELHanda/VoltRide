import { PrismaClient } from '@prisma/client';
import { Maintenance, MaintenancePart } from '../../../../core/domain/entities/Maintenance';
import { IMaintenanceRepository } from '../../../../core/domain/repositories/IMaintenanceRepository';
import { PrismaService } from '../PrismaService';

/**
 * PostgreSQL implementation of the Maintenance repository using Prisma
 */
export class PrismaMaintenanceRepository implements IMaintenanceRepository {
  private prisma: PrismaClient;

  /**
   * Constructor
   */
  constructor() {
    this.prisma = PrismaService.getClient();
  }

  /**
   * Adds a new maintenance record
   * @param maintenance The maintenance record to add
   * @returns A promise that resolves to the added maintenance record
   */
  async addMaintenance(maintenance: Maintenance): Promise<Maintenance> {
    // Create the maintenance record
    const createdMaintenance = await this.prisma.maintenance.create({
      data: {
        type: maintenance.getType(),
        date: maintenance.getDate(),
        cost: maintenance.getCost(),
        comment: maintenance.getComment(),
        technician_name: maintenance.getTechnicianName(),
        scooter_id: maintenance.getScooterId()
      }
    });

    // Set the ID on the domain entity
    maintenance.setId(createdMaintenance.id);

    return maintenance;
  }

  /**
   * Updates a maintenance record
   * @param maintenance The maintenance record to update
   * @returns A promise that resolves to the updated maintenance record
   */
  async updateMaintenance(maintenance: Maintenance): Promise<Maintenance> {
    // Update the maintenance record
    await this.prisma.maintenance.update({
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

    return maintenance;
  }

  /**
   * Deletes a maintenance record
   * @param id The ID of the maintenance record to delete
   * @returns A promise that resolves to the deleted maintenance record
   */
  async deleteMaintenance(id: number): Promise<Maintenance> {
    // Get the maintenance record before deleting it
    const maintenance = await this.getMaintenanceById(id);
    if (!maintenance) {
      throw new Error(`Maintenance with ID ${id} not found.`);
    }

    // Delete the maintenance record
    await this.prisma.maintenance.delete({
      where: { id }
    });

    return maintenance;
  }

  /**
   * Gets all maintenance records
   * @returns A promise that resolves to an array of maintenance records
   */
  async getAllMaintenances(): Promise<Maintenance[]> {
    const maintenances = await this.prisma.maintenance.findMany();
    
    return maintenances.map((maintenance: any) => this.mapToDomainEntity(maintenance));
  }

  /**
   * Gets a maintenance record by ID
   * @param id The ID of the maintenance record to get
   * @returns A promise that resolves to a maintenance record or null if not found
   */
  async getMaintenanceById(id: number): Promise<Maintenance | null> {
    const maintenance = await this.prisma.maintenance.findUnique({
      where: { id }
    });

    if (!maintenance) {
      return null;
    }

    return this.mapToDomainEntity(maintenance);
  }

  /**
   * Gets maintenance records by scooter ID
   * @param scooterId The ID of the scooter
   * @returns A promise that resolves to an array of maintenance records
   */
  async getMaintenancesByScooterId(scooterId: number): Promise<Maintenance[]> {
    const maintenances = await this.prisma.maintenance.findMany({
      where: { scooter_id: scooterId }
    });

    return maintenances.map((maintenance: any) => this.mapToDomainEntity(maintenance));
  }

  /**
   * Maps a Prisma maintenance record to a domain entity
   * @param prismaMaintenance The Prisma maintenance record
   * @returns The domain entity
   */
  private mapToDomainEntity(prismaMaintenance: any): Maintenance {
    const maintenance = new Maintenance(
      prismaMaintenance.type,
      prismaMaintenance.date,
      prismaMaintenance.cost,
      prismaMaintenance.comment || '',
      prismaMaintenance.technician_name,
      prismaMaintenance.scooter_id,
      prismaMaintenance.id
    );

    // In a real implementation, we would also load and add the parts
    // For simplicity, we're not implementing that here

    return maintenance;
  }
}
