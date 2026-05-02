/*
  Warnings:

  - You are about to drop the `Initial` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "prokerStatus" AS ENUM ('ComingSoon', 'OnGoing', 'Completed');

-- DropTable
DROP TABLE "Initial";

-- CreateTable
CREATE TABLE "departement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "departement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fotoDepartement" (
    "id" TEXT NOT NULL,
    "departement_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "namaFoto" TEXT NOT NULL,

    CONSTRAINT "fotoDepartement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "departement_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "created_by_user_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "achiever_name" TEXT NOT NULL,
    "achievement_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proker" (
    "id" TEXT NOT NULL,
    "departement_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "prokerStatus" NOT NULL DEFAULT 'ComingSoon',
    "event_start" TIMESTAMP(3) NOT NULL,
    "event_end" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Proker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fotoProker" (
    "id" TEXT NOT NULL,
    "proker_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "fotoProker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fotoAchievement" (
    "id" TEXT NOT NULL,
    "achievement_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "fotoAchievement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fotoDepartement" ADD CONSTRAINT "fotoDepartement_departement_id_fkey" FOREIGN KEY ("departement_id") REFERENCES "departement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_departement_id_fkey" FOREIGN KEY ("departement_id") REFERENCES "departement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proker" ADD CONSTRAINT "Proker_departement_id_fkey" FOREIGN KEY ("departement_id") REFERENCES "departement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fotoProker" ADD CONSTRAINT "fotoProker_proker_id_fkey" FOREIGN KEY ("proker_id") REFERENCES "Proker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fotoAchievement" ADD CONSTRAINT "fotoAchievement_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
