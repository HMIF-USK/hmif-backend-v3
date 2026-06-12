import { Request, Response } from "express";
import AchievementsService from "./AchievementsService";

class AchievementsController {
  /**
   * GET /achievements
   * Get all achievements
   */
  public async getAllAchievements(req: Request, res: Response) {
    try {
      const achievements = await AchievementsService.getAllAchievements();
      res.status(200).json({
        message: "Achievements retrieved successfully",
        data: achievements
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * GET /achievements/latest
   * Get latest achievements with optional limit query
   */
  public async getLatestAchievements(req: Request, res: Response) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const achievements = await AchievementsService.getLatestAchievements({ limit });
      
      res.status(200).json({
        message: "Latest achievements retrieved successfully",
        data: achievements
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * GET /achievements/:id
   * Get achievement by ID
   */
  public async getAchievementById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const achievement = await AchievementsService.getAchievementById(id);
      
      res.status(200).json({
        message: "Achievement retrieved successfully",
        data: achievement
      });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new AchievementsController();
