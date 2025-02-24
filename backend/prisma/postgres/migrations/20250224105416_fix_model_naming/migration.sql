/*
  Warnings:

  - You are about to drop the `articles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dealers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `partners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `scooters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `scooters_models` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `warranty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Maintenance" DROP CONSTRAINT "Maintenance_scooter_id_fkey";

-- DropForeignKey
ALTER TABLE "dealers" DROP CONSTRAINT "fk_dealers_user";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "fk_order_item_article";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "fk_order_item_order";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "fk_order_user";

-- DropForeignKey
ALTER TABLE "partners" DROP CONSTRAINT "fk_partners_user";

-- DropForeignKey
ALTER TABLE "scooters" DROP CONSTRAINT "fk_scooter_dealer";

-- DropForeignKey
ALTER TABLE "scooters" DROP CONSTRAINT "fk_scooter_model";

-- DropForeignKey
ALTER TABLE "scooters" DROP CONSTRAINT "fk_scooter_partner";

-- DropForeignKey
ALTER TABLE "warranty" DROP CONSTRAINT "fk_warranty_scooter";

-- DropTable
DROP TABLE "articles";

-- DropTable
DROP TABLE "dealers";

-- DropTable
DROP TABLE "order_items";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "partners";

-- DropTable
DROP TABLE "scooters";

-- DropTable
DROP TABLE "scooters_models";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "warranty";

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "stock_quantity" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dealer" (
    "id" SERIAL NOT NULL,
    "company_name" VARCHAR NOT NULL,
    "contact_number" VARCHAR NOT NULL,
    "contact_email" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "country" VARCHAR NOT NULL,
    "postal_code" VARCHAR NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "Dealer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "article_id" INTEGER NOT NULL,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_price" DECIMAL(10,2),
    "order_id" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "supplier" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,
    "delivery_due_date" DATE NOT NULL,
    "tax" DECIMAL(5,2) NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "company_name" VARCHAR NOT NULL,
    "contact_number" VARCHAR NOT NULL,
    "contact_email" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "country" VARCHAR NOT NULL,
    "postal_code" VARCHAR NOT NULL,
    "type" VARCHAR NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scooter" (
    "id" SERIAL NOT NULL,
    "license_plate" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,
    "dealer_id" INTEGER,
    "partner_id" INTEGER,
    "scooter_model_id" INTEGER NOT NULL,

    CONSTRAINT "Scooter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScooterModel" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "battery_range" INTEGER NOT NULL,
    "maintenance_interval" INTEGER NOT NULL,

    CONSTRAINT "ScooterModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" VARCHAR NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warranty" (
    "id" SERIAL NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "type" VARCHAR NOT NULL,
    "scooter_id" INTEGER NOT NULL,

    CONSTRAINT "Warranty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_contact_email_key" ON "Dealer"("contact_email");

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_user_id_key" ON "Dealer"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Partner_contact_email_key" ON "Partner"("contact_email");

-- CreateIndex
CREATE UNIQUE INDEX "Partner_user_id_key" ON "Partner"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Scooter_license_plate_key" ON "Scooter"("license_plate");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Warranty_scooter_id_key" ON "Warranty"("scooter_id");

-- AddForeignKey
ALTER TABLE "Dealer" ADD CONSTRAINT "Dealer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_scooter_id_fkey" FOREIGN KEY ("scooter_id") REFERENCES "Scooter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scooter" ADD CONSTRAINT "Scooter_dealer_id_fkey" FOREIGN KEY ("dealer_id") REFERENCES "Dealer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scooter" ADD CONSTRAINT "Scooter_scooter_model_id_fkey" FOREIGN KEY ("scooter_model_id") REFERENCES "ScooterModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scooter" ADD CONSTRAINT "Scooter_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "Partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warranty" ADD CONSTRAINT "Warranty_scooter_id_fkey" FOREIGN KEY ("scooter_id") REFERENCES "Scooter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
