import express from "express";
import AchievementsController from "@/module/achievements/AchievementsController";

class AchievementsRouter {
  public achievementsRouter;

  constructor() {
    this.achievementsRouter = express.Router();
    this.routes();
  }

  private routes() {
    // GET /achievements - Get all achievements
    this.achievementsRouter.get("/", AchievementsController.getAllAchievements);

    // GET /achievements/latest - Get latest achievements with optional limit
    this.achievementsRouter.get("/latest", AchievementsController.getLatestAchievements);

    // GET /achievements/:id - Get achievement by ID
    this.achievementsRouter.get("/:id", AchievementsController.getAchievementById);
  }
}

export default new AchievementsRouter().achievementsRouter;
