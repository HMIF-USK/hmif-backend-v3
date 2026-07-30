import { Router } from "express";
import authRouter from "@/module/auth/AuthRouter";
import activityRouter from "@/module/activities/ActivityRouter";
import achievementRouter from "@/module/achievement/Achievementrouter";
import departmentRouter from "@/module/department/DepartmentRouter";
import prokerRouter from "@/module/proker/ProkerRouter";
import clubRouter from "@/module/clubs/ClubRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/activities", activityRouter);
router.use("/achievements", achievementRouter);
router.use("/departments", departmentRouter);
router.use("/prokers", prokerRouter);
router.use("/clubs", clubRouter);

export default router;