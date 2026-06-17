import { PrismaClient } from "@prisma/client";
import { AchievementResponse, GetAchievementsQuery } from "./achievements.types";

const prisma = new PrismaClient();

// Regex sederhana untuk validasi format UUID v4
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

class AchievementsService {
  /**
   * Get all achievements
   * Kemungkinan hasil:
   *  - Array berisi data (200)
   *  - Array kosong — belum ada data (200 dengan data: [])
   *  - Error koneksi database (500)
   */
  public async getAllAchievements(): Promise<AchievementResponse[]> {
    const achievements = await prisma.achievement.findMany({
      include: {
        fotoAchievements: {
          select: {
            id: true,
            url: true
          }
        }
      },
      orderBy: {
        created_at: "desc"
      }
    });

    return achievements as AchievementResponse[];
  }

  /**
   * Get latest achievements with optional limit
   * Kemungkinan hasil:
   *  - Array berisi data sesuai limit (200)
   *  - Array kosong — belum ada data (200 dengan data: [])
   *  - limit bukan angka → throw ValidationError (400)
   *  - limit ≤ 0 → throw ValidationError (400)
   *  - limit > 100 → throw ValidationError (400)
   *  - Error koneksi database (500)
   */
  public async getLatestAchievements(query: GetAchievementsQuery): Promise<AchievementResponse[]> {
    const rawLimit = query.limit;

    // Validasi: limit harus angka
    if (rawLimit !== undefined) {
      if (!Number.isFinite(rawLimit) || isNaN(rawLimit)) {
        const err: any = new Error("Parameter 'limit' harus berupa angka yang valid");
        err.statusCode = 400;
        throw err;
      }

      // Validasi: limit harus positif
      if (rawLimit <= 0) {
        const err: any = new Error("Parameter 'limit' harus bernilai lebih dari 0");
        err.statusCode = 400;
        throw err;
      }

      // Validasi: limit tidak boleh terlalu besar
      if (rawLimit > 100) {
        const err: any = new Error("Parameter 'limit' tidak boleh melebihi 100");
        err.statusCode = 400;
        throw err;
      }
    }

    const limit = rawLimit ?? 10;

    const achievements = await prisma.achievement.findMany({
      take: limit,
      include: {
        fotoAchievements: {
          select: {
            id: true,
            url: true
          }
        }
      },
      orderBy: {
        achievement_date: "desc"
      }
    });

    return achievements as AchievementResponse[];
  }

  /**
   * Get achievement by ID
   * Kemungkinan hasil:
   *  - Data ditemukan (200)
   *  - id kosong / tidak diberikan → throw ValidationError (400)
   *  - id bukan format UUID → throw ValidationError (400)
   *  - id valid tapi data tidak ada → throw NotFoundError (404)
   *  - Error koneksi database (500)
   */
  public async getAchievementById(id: string): Promise<AchievementResponse> {
    // Validasi: id tidak boleh kosong
    if (!id || id.trim() === "") {
      const err: any = new Error("Parameter 'id' tidak boleh kosong");
      err.statusCode = 400;
      throw err;
    }

    // Validasi: id harus format UUID
    if (!UUID_REGEX.test(id.trim())) {
      const err: any = new Error("Parameter 'id' harus berupa UUID yang valid (contoh: d3e4f5a6-b7c8-9012-def0-123456789abc)");
      err.statusCode = 400;
      throw err;
    }

    const achievement = await prisma.achievement.findUnique({
      where: { id: id.trim() },
      include: {
        fotoAchievements: {
          select: {
            id: true,
            url: true
          }
        }
      }
    });

    if (!achievement) {
      const err: any = new Error("Achievement not found");
      err.statusCode = 404;
      throw err;
    }

    return achievement as AchievementResponse;
  }
}

export default new AchievementsService();
