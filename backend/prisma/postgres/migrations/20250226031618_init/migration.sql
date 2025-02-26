/*
  Warnings:

  - You are about to drop the column `scooter_model_id` on the `scooters` table. All the data in the column will be lost.
  - Added the required column `scooterModelId` to the `scooters` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "scooters" DROP CONSTRAINT "fk_scooter_model";

-- AlterTable
ALTER TABLE "scooters" DROP COLUMN "scooter_model_id",
ADD COLUMN     "scooterModelId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "scooters" ADD CONSTRAINT "fk_scooter_model" FOREIGN KEY ("scooterModelId") REFERENCES "scooters_models"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
