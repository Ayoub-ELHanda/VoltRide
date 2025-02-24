/*
  Warnings:

  - You are about to drop the column `date` on the `maintenances` table. All the data in the column will be lost.
  - Added the required column `date_planned` to the `maintenances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "maintenances" DROP COLUMN "date",
ADD COLUMN     "date_completed" TIMESTAMP(3),
ADD COLUMN     "date_planned" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'planifiée';

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "message" VARCHAR NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "maintenance_id" INTEGER NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_maintenance_id_fkey" FOREIGN KEY ("maintenance_id") REFERENCES "maintenances"("id") ON DELETE CASCADE ON UPDATE CASCADE;
