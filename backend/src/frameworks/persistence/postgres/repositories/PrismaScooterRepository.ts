import { PrismaClient } from '@prisma/client';
import { Scooter } from '../../../../core/domain/entities/Scooter';
import { ScooterModel } from '../../../../core/domain/entities/ScooterModel';
import { IScooterRepository } from '../../../../core/domain/repositories/IScooterRepository';
import { PrismaService } from '../PrismaService';

/**
 * PostgreSQL implementation of the Scooter repository using Prisma
 */
export class PrismaScooterRepository implements IScooterRepository {
  private prisma: PrismaClient;

  /**
   * Constructor
   */
  constructor() {
    this.prisma = PrismaService.getClient();
  }

  /**
   * Gets all scooters
   * @returns A promise that resolves to an array of scooters
   */
  async getAllScooters(): Promise<Scooter[]> {
    const scooters = await this.prisma.scooter.findMany({
      include: {
        scooters_models: true,
      },
    });

    return scooters.map((scooter: any) => this.mapToDomainEntity(scooter, scooter.scooters_models));
  }

  /**
   * Gets a scooter by ID
   * @param id The ID of the scooter to get
   * @returns A promise that resolves to a scooter or null if not found
   */
  async getScooterById(id: number): Promise<Scooter | null> {
    const scooter = await this.prisma.scooter.findUnique({
      where: {
        id: id,
      },
      include: {
        scooters_models: true,
      },
    });

    if (!scooter) {
      return null;
    }

    return this.mapToDomainEntity(scooter, scooter.scooters_models);
  }

  /**
   * Adds a new scooter
   * @param scooter The scooter to add
   * @returns A promise that resolves to the added scooter
   */
  async addScooter(scooter: Scooter): Promise<Scooter> {
    const createdScooter = await this.prisma.scooter.create({
      data: {
        license_plate: scooter.getLicensePlate(),
        status: scooter.getStatus(),
        dealer_id: scooter.getDealerId() || null,
        partner_id: scooter.getPartnerId() || null,
        scooterModelId: scooter.getScooterModel().getId(),
      },
      include: {
        scooters_models: true,
      },
    });

    return this.mapToDomainEntity(createdScooter, createdScooter.scooters_models);
  }

  /**
   * Updates a scooter
   * @param scooter The scooter to update
   * @returns A promise that resolves to the updated scooter
   */
  async updateScooter(scooter: Scooter): Promise<Scooter> {
    const updatedScooter = await this.prisma.scooter.update({
      where: {
        id: scooter.getId(),
      },
      data: {
        license_plate: scooter.getLicensePlate(),
        status: scooter.getStatus(),
        dealer_id: scooter.getDealerId() || null,
        partner_id: scooter.getPartnerId() || null,
        scooterModelId: scooter.getScooterModel().getId(),
      },
      include: {
        scooters_models: true,
      },
    });

    return this.mapToDomainEntity(updatedScooter, updatedScooter.scooters_models);
  }

  /**
   * Deletes a scooter
   * @param id The ID of the scooter to delete
   * @returns A promise that resolves to the deleted scooter
   */
  async deleteScooter(id: number): Promise<Scooter> {
    const deletedScooter = await this.prisma.scooter.delete({
      where: {
        id: id,
      },
      include: {
        scooters_models: true,
      },
    });

    return this.mapToDomainEntity(deletedScooter, deletedScooter.scooters_models);
  }

  /**
   * Maps a Prisma scooter to a domain entity
   * @param prismaScooter The Prisma scooter
   * @param prismaScooterModel The Prisma scooter model
   * @returns The domain entity
   */
  private mapToDomainEntity(
    prismaScooter: any,
    prismaScooterModel: any
  ): Scooter {
    // Create the scooter model entity
    const scooterModel = new ScooterModel(
      prismaScooterModel.id,
      prismaScooterModel.name,
      prismaScooterModel.battery_range,
      prismaScooterModel.maintenance_interval
    );

    // Create the scooter entity
    return new Scooter(
      prismaScooter.id,
      prismaScooter.license_plate,
      prismaScooter.status,
      scooterModel,
      prismaScooter.dealer_id || undefined,
      prismaScooter.partner_id || undefined
    );
  }
}
