/*
  Warnings:

  - The values [nba] on the enum `userrRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `departement_id` on the `user` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `departement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "userrRole_new" AS ENUM ('mba', 'superSser');
ALTER TABLE "user" ALTER COLUMN "role" TYPE "userrRole_new" USING ("role"::text::"userrRole_new");
ALTER TYPE "userrRole" RENAME TO "userrRole_old";
ALTER TYPE "userrRole_new" RENAME TO "userrRole";
DROP TYPE "public"."userrRole_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_departement_id_fkey";

-- AlterTable
ALTER TABLE "departement" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "departement_id";

-- AddForeignKey
ALTER TABLE "departement" ADD CONSTRAINT "departement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
