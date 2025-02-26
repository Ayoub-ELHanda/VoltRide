/*
  Warnings:

  - You are about to alter the column `cost` on the `maintenances` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - Added the required column `updatedAt` to the `maintenances` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "maintenances" DROP CONSTRAINT "fk_maintenance_scooter";

-- AlterTable
ALTER TABLE "maintenances" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "cost" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_scooter_id_fkey" FOREIGN KEY ("scooter_id") REFERENCES "scooters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
