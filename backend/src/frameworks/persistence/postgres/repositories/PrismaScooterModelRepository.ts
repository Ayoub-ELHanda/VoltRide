import { PrismaClient } from '@prisma/client';
import { ScooterModel } from '../../../../core/domain/entities/ScooterModel';
import { IScooterModelRepository } from '../../../../core/domain/repositories/IScooterModelRepository';
import { PrismaService } from '../PrismaService';

/**
 * PostgreSQL implementation of the ScooterModel repository using Prisma
 */
export class PrismaScooterModelRepository implements IScooterModelRepository {
  private prisma: PrismaClient;

  /**
   * Constructor
   */
  constructor() {
    this.prisma = PrismaService.getClient();
  }

  /**
   * Gets all scooter models
   * @returns A promise that resolves to an array of scooter models
   */
  async getAllScooterModels(): Promise<ScooterModel[]> {
    const scooterModels = await this.prisma.scooter_model.findMany();
    
    return scooterModels.map((model: any) => this.mapToDomainEntity(model));
  }

  /**
   * Gets a scooter model by ID
   * @param id The ID of the scooter model to get
   * @returns A promise that resolves to a scooter model or null if not found
   */
  async getScooterModelById(id: number): Promise<ScooterModel | null> {
    const scooterModel = await this.prisma.scooter_model.findUnique({
      where: { id }
    });

    if (!scooterModel) {
      return null;
    }

    return this.mapToDomainEntity(scooterModel);
  }

  /**
   * Adds a new scooter model
   * @param scooterModel The scooter model to add
   * @returns A promise that resolves to the added scooter model
   */
  async addScooterModel(scooterModel: ScooterModel): Promise<ScooterModel> {
    const createdScooterModel = await this.prisma.scooter_model.create({
      data: {
        name: scooterModel.getName(),
        battery_range: scooterModel.getBatteryRange(),
        maintenance_interval: scooterModel.getMaintenanceInterval()
      }
    });

    return this.mapToDomainEntity(createdScooterModel);
  }

  /**
   * Updates a scooter model
   * @param scooterModel The scooter model to update
   * @returns A promise that resolves to the updated scooter model
   */
  async updateScooterModel(scooterModel: ScooterModel): Promise<ScooterModel> {
    const updatedScooterModel = await this.prisma.scooter_model.update({
      where: { id: scooterModel.getId() },
      data: {
        name: scooterModel.getName(),
        battery_range: scooterModel.getBatteryRange(),
        maintenance_interval: scooterModel.getMaintenanceInterval()
      }
    });

    return this.mapToDomainEntity(updatedScooterModel);
  }

  /**
   * Deletes a scooter model
   * @param id The ID of the scooter model to delete
   * @returns A promise that resolves to the deleted scooter model
   */
  async deleteScooterModel(id: number): Promise<ScooterModel> {
    // Get the scooter model before deleting it
    const scooterModel = await this.getScooterModelById(id);
    if (!scooterModel) {
      throw new Error(`Scooter model with ID ${id} not found.`);
    }

    // Delete the scooter model
    await this.prisma.scooter_model.delete({
      where: { id }
    });

    return scooterModel;
  }

  /**
   * Maps a Prisma scooter model to a domain entity
   * @param prismaScooterModel The Prisma scooter model
   * @returns The domain entity
   */
  private mapToDomainEntity(prismaScooterModel: any): ScooterModel {
    return new ScooterModel(
      prismaScooterModel.id,
      prismaScooterModel.name,
      prismaScooterModel.battery_range,
      prismaScooterModel.maintenance_interval
    );
  }
}
