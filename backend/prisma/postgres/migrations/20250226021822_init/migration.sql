/*
  Warnings:

  - You are about to drop the column `createdAt` on the `maintenances` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `maintenances` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "maintenances" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
