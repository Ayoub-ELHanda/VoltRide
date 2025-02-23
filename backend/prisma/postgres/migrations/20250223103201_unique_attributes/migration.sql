/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `articles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contact_number]` on the table `dealers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contact_number]` on the table `partners` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `scooters_models` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "articles_name_key" ON "articles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "dealers_contact_number_key" ON "dealers"("contact_number");

-- CreateIndex
CREATE UNIQUE INDEX "partners_contact_number_key" ON "partners"("contact_number");

-- CreateIndex
CREATE UNIQUE INDEX "scooters_models_name_key" ON "scooters_models"("name");
