import { Router } from "express";
import authRouter from "@/module/auth/AuthRouter";
import activityRouter from "@/module/activities/ActivityRouter";
import prokerRouter from "@/module/proker/ProkerRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/activities", activityRouter);
router.use("/prokers", prokerRouter);

export default router;