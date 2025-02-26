import { PrismaClient } from '@prisma/client';

/**
 * Singleton service for Prisma client
 * Ensures that only one instance of PrismaClient is created
 */
export class PrismaService {
  private static instance: PrismaClient;

  /**
   * Private constructor to prevent direct instantiation
   */
  private constructor() {}

  /**
   * Gets the Prisma client instance
   * @returns The Prisma client instance
   */
  static getClient(): PrismaClient {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaClient();
    }
    return PrismaService.instance;
  }

  /**
   * Disconnects the Prisma client
   */
  static async disconnect(): Promise<void> {
    if (PrismaService.instance) {
      await PrismaService.instance.$disconnect();
    }
  }

  /**
   * Connects the Prisma client
   */
  static async connect(): Promise<void> {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaClient();
    }
    await PrismaService.instance.$connect();
  }
}
