-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "stock_quantity" INTEGER NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dealers" (
    "id" SERIAL NOT NULL,
    "company_name" VARCHAR NOT NULL,
    "contact_number" VARCHAR NOT NULL,
    "contact_email" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "country" VARCHAR NOT NULL,
    "postal_code" VARCHAR NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "dealers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenances" (
    "id" SERIAL NOT NULL,
    "technician_name" VARCHAR NOT NULL,
    "type" VARCHAR NOT NULL,
    "date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cost" DECIMAL(10,2) NOT NULL,
    "comment" TEXT,
    "scooter_id" INTEGER NOT NULL,

    CONSTRAINT "maintenances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" SERIAL NOT NULL,
    "article_id" INTEGER NOT NULL,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_price" DECIMAL(10,2),
    "order_id" INTEGER NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "supplier" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,
    "delivery_due_date" DATE NOT NULL,
    "tax" DECIMAL(5,2) NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partners" (
    "id" SERIAL NOT NULL,
    "company_name" VARCHAR NOT NULL,
    "contact_number" VARCHAR NOT NULL,
    "contact_email" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "country" VARCHAR NOT NULL,
    "postal_code" VARCHAR NOT NULL,
    "type" VARCHAR NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scooters" (
    "id" SERIAL NOT NULL,
    "license_plate" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,
    "dealer_id" INTEGER,
    "partner_id" INTEGER,
    "scooter_model_id" INTEGER NOT NULL,

    CONSTRAINT "scooters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scooters_models" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "battery_range" INTEGER NOT NULL,
    "maintenance_interval" INTEGER NOT NULL,

    CONSTRAINT "scooters_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" VARCHAR NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warranty" (
    "id" SERIAL NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "type" VARCHAR NOT NULL,
    "scooter_id" INTEGER NOT NULL,

    CONSTRAINT "warranty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dealers_contact_email_key" ON "dealers"("contact_email");

-- CreateIndex
CREATE UNIQUE INDEX "dealers_user_id_key" ON "dealers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "partners_contact_email_key" ON "partners"("contact_email");

-- CreateIndex
CREATE UNIQUE INDEX "partners_user_id_key" ON "partners"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "scooters_license_plate_key" ON "scooters"("license_plate");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "warranty_scooter_id_key" ON "warranty"("scooter_id");

-- AddForeignKey
ALTER TABLE "dealers" ADD CONSTRAINT "fk_dealers_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "fk_maintenance_scooter" FOREIGN KEY ("scooter_id") REFERENCES "scooters"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "fk_order_item_article" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "fk_order_item_order" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_order_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partners" ADD CONSTRAINT "fk_partners_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "scooters" ADD CONSTRAINT "fk_scooter_dealer" FOREIGN KEY ("dealer_id") REFERENCES "dealers"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "scooters" ADD CONSTRAINT "fk_scooter_model" FOREIGN KEY ("scooter_model_id") REFERENCES "scooters_models"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "scooters" ADD CONSTRAINT "fk_scooter_partner" FOREIGN KEY ("partner_id") REFERENCES "partners"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "warranty" ADD CONSTRAINT "fk_warranty_scooter" FOREIGN KEY ("scooter_id") REFERENCES "scooters"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
