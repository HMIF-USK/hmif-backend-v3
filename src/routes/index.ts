import { Router } from "express";
import authRouter from "@/module/auth/AuthRouter";
import achievementsRouter from "@/module/achievements/AchievementsRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/achievements", achievementsRouter);

export default router;
