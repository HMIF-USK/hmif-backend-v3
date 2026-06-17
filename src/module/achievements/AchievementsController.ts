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
  public async getAllAchievements(req: Request, res: Response):Promise<void> {
    try {
      const achievements = await AchievementsService.getAllAchievements();
      res.status(200).json({
        message: "Achievements retrieved successfully",
        data: achievements
      });
      return
    } catch (error: any) {
       res.status(500).json({
        message: "Terjadi kesalahan pada server",
        error: error.message
      });
      return
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
  public async getLatestAchievements(req: Request, res: Response):Promise<void> {
    try {
      const rawLimit = req.query.limit as string | undefined;

      // Jika limit dikirim, pastikan bisa di-parse sebagai angka
      let parsedLimit: number | undefined;
      if (rawLimit !== undefined) {
        parsedLimit = Number(rawLimit);
        if (isNaN(parsedLimit)) {
          res.status(400).json({
            message: "Parameter 'limit' harus berupa angka yang valid",
            error: `Nilai yang diterima: '${rawLimit}'`
          });
          return;
        }
      }

      const achievements = await AchievementsService.getLatestAchievements({
        limit: parsedLimit
      });

       res.status(200).json({
        message: "Latest achievements retrieved successfully",
        data: achievements
      });
      return
    } catch (error: any) {
      const status = error.statusCode ?? 500;
       res.status(status).json({
        message: error.message ?? "Terjadi kesalahan pada server",
        error: status === 500 ? error.message : undefined
      });
      return
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
  public async getAchievementById(req: Request, res: Response):Promise<void> {
    try {
      const { id } = req.params;
      const achievement = await AchievementsService.getAchievementById(id);

      res.status(200).json({
        message: "Achievement retrieved successfully",
        data: achievement
      });
      return

    } catch (error: any) {
      const status = error.statusCode ?? 500;
       res.status(status).json({
        message: error.message ?? "Terjadi kesalahan pada server",
        error: status === 500 ? error.message : undefined
      });
      return
    }
  }
}

export default new AchievementsController();
