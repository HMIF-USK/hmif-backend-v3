/*
  Warnings:

  - The values [superSser] on the enum `userrRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "userrRole_new" AS ENUM ('mba', 'superUser');
ALTER TABLE "user" ALTER COLUMN "role" TYPE "userrRole_new" USING ("role"::text::"userrRole_new");
ALTER TYPE "userrRole" RENAME TO "userrRole_old";
ALTER TYPE "userrRole_new" RENAME TO "userrRole";
DROP TYPE "public"."userrRole_old";
COMMIT;
