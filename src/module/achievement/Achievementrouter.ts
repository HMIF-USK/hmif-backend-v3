import { Router } from "express";
import { achievementController } from "./Achievementcontroller";
import { verifyToken, requireRole } from "../../middleware/auth";
import {
  validateCreateAchievement,
  validateUpdateAchievement,
  validateDeleteAchievement,
} from "./Achievementvalidation";

const achievementRouter = Router();

achievementRouter.use(verifyToken);
// Hanya departemen MBA (dan superUser) yang boleh kelola achievement.
achievementRouter.use(requireRole("mba", "superUser"));

// POST /achievements
achievementRouter.post("/", validateCreateAchievement, achievementController.create);

// PUT /achievements/:id
achievementRouter.put("/:id", validateUpdateAchievement, achievementController.update);

// DELETE /achievements/:id
achievementRouter.delete("/:id", validateDeleteAchievement, achievementController.remove);

export default achievementRouter;