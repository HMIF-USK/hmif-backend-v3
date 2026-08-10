-- Tingkat (nasional/provinsi/...) dan tanggal selesai dari form admin achievement
ALTER TABLE "Achievement" ADD COLUMN IF NOT EXISTS "achievement_end_date" TIMESTAMP(3);
ALTER TABLE "Achievement" ADD COLUMN IF NOT EXISTS "level" TEXT;
