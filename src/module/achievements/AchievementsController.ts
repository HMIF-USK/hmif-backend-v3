import { Request, Response } from "express";
import AchievementsService from "./AchievementsService";

class AchievementsController {
  /**
   * GET /achievements
   * Get all achievements
   *
   * Kemungkinan respons:
   *  200 – Berhasil, data berupa array (bisa kosong [])
   *  500 – Error tidak terduga dari server / database
   */
  public async getAllAchievements(req: Request, res: Response) {
    try {
      const achievements = await AchievementsService.getAllAchievements();
      return res.status(200).json({
        message: "Achievements retrieved successfully",
        data: achievements
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Terjadi kesalahan pada server",
        error: error.message
      });
    }
  }

  /**
   * GET /achievements/latest
   * Get latest achievements with optional limit query
   *
   * Kemungkinan respons:
   *  200 – Berhasil, data berupa array (bisa kosong [])
   *  400 – Parameter `limit` tidak valid (bukan angka, ≤ 0, atau > 100)
   *  500 – Error tidak terduga dari server / database
   */
  public async getLatestAchievements(req: Request, res: Response) {
    try {
      const rawLimit = req.query.limit as string | undefined;

      // Jika limit dikirim, pastikan bisa di-parse sebagai angka
      let parsedLimit: number | undefined;
      if (rawLimit !== undefined) {
        parsedLimit = Number(rawLimit);
        if (isNaN(parsedLimit)) {
          return res.status(400).json({
            message: "Parameter 'limit' harus berupa angka yang valid",
            error: `Nilai yang diterima: '${rawLimit}'`
          });
        }
      }

      const achievements = await AchievementsService.getLatestAchievements({
        limit: parsedLimit
      });

      return res.status(200).json({
        message: "Latest achievements retrieved successfully",
        data: achievements
      });
    } catch (error: any) {
      const status = error.statusCode ?? 500;
      return res.status(status).json({
        message: error.message ?? "Terjadi kesalahan pada server",
        error: status === 500 ? error.message : undefined
      });
    }
  }

  /**
   * GET /achievements/:id
   * Get achievement by ID
   *
   * Kemungkinan respons:
   *  200 – Data ditemukan
   *  400 – ID kosong atau bukan format UUID yang valid
   *  404 – Tidak ada data dengan ID tersebut
   *  500 – Error tidak terduga dari server / database
   */
  public async getAchievementById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const achievement = await AchievementsService.getAchievementById(id);

      return res.status(200).json({
        message: "Achievement retrieved successfully",
        data: achievement
      });
    } catch (error: any) {
      const status = error.statusCode ?? 500;
      return res.status(status).json({
        message: error.message ?? "Terjadi kesalahan pada server",
        error: status === 500 ? error.message : undefined
      });
    }
  }
}

export default new AchievementsController();
