import { Router } from "express";
import authRouter from "@/module/auth/AuthRouter";
import activityRouter from "@/module/activities/ActivityRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/activities", activityRouter); 

export default router;
