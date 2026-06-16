import { Router } from "express";
import { achievementController } from "@/module/achievement/Achievementcontroller";
import { verifyToken } from "@/middleware/auth";
import {
  validateCreateAchievement,
  validateUpdateAchievement,
  validateDeleteAchievement,
} from "@/module/achievement/Achievementvalidation";

const achievementRouter = Router();

achievementRouter.use(verifyToken);

// POST /achievements
achievementRouter.post("/", validateCreateAchievement, achievementController.create);

// PUT /achievements/:id
achievementRouter.put("/:id", validateUpdateAchievement, achievementController.update);

// DELETE /achievements/:id
achievementRouter.delete("/:id", validateDeleteAchievement, achievementController.remove);

export default achievementRouter;