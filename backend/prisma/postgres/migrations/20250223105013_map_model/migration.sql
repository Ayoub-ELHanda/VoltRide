/*
  Warnings:

  - You are about to drop the `warranty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "warranty" DROP CONSTRAINT "fk_warranty_scooter";

-- DropTable
DROP TABLE "warranty";

-- CreateTable
CREATE TABLE "warranties" (
    "id" SERIAL NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "type" VARCHAR NOT NULL,
    "scooter_id" INTEGER NOT NULL,

    CONSTRAINT "warranties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "warranties_scooter_id_key" ON "warranties"("scooter_id");

-- AddForeignKey
ALTER TABLE "warranties" ADD CONSTRAINT "fk_warranty_scooter" FOREIGN KEY ("scooter_id") REFERENCES "scooters"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
