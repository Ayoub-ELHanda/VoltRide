/*
  Warnings:

  - You are about to drop the `maintenances` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "maintenances" DROP CONSTRAINT "fk_maintenance_scooter";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_maintenance_id_fkey";

-- DropTable
DROP TABLE "maintenances";

-- DropTable
DROP TABLE "notifications";

-- CreateTable
CREATE TABLE "Maintenance" (
    "id" SERIAL NOT NULL,
    "technician_name" VARCHAR NOT NULL,
    "type" VARCHAR NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'planifiée',
    "date_planned" TIMESTAMP(3) NOT NULL,
    "date_completed" TIMESTAMP(3),
    "cost" DECIMAL(10,2) NOT NULL,
    "comment" TEXT,
    "scooter_id" INTEGER NOT NULL,

    CONSTRAINT "Maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "message" VARCHAR NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "maintenance_id" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_scooter_id_fkey" FOREIGN KEY ("scooter_id") REFERENCES "scooters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_maintenance_id_fkey" FOREIGN KEY ("maintenance_id") REFERENCES "Maintenance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
