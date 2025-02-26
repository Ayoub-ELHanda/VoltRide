-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "message" VARCHAR NOT NULL,
    "recipient" VARCHAR NOT NULL,
    "type" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,
    "trigger_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);
