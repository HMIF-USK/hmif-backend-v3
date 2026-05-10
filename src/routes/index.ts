import { Router } from "express";
import authRouter from "@/module/auth/AuthRouter";
import achievementRouter from "@/module/achievement/Achievementrouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/achievements", achievementRouter);

export default router;