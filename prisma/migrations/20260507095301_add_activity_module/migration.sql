-- CreateEnum
CREATE TYPE "activityStatus" AS ENUM ('ComingSoon', 'OnGoing', 'Completed');

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" "activityStatus" NOT NULL DEFAULT 'ComingSoon',
    "event_start" TIMESTAMP(3) NOT NULL,
    "event_end" TIMESTAMP(3) NOT NULL,
    "created_by_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fotoActivity" (
    "id" TEXT NOT NULL,
    "activity_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "fotoActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fotoActivity" ADD CONSTRAINT "fotoActivity_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
