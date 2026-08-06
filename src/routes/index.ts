import { Router } from "express";
import authRouter from "../module/auth/AuthRouter";
import activityRouter from "../module/activities/ActivityRouter";
import achievementsRouter from "../module/achievements/AchievementsRouter";
import achievementRouter from "../module/achievement/Achievementrouter";
import departmentRouter from "../module/department/DepartmentRouter";
import prokerRouter from "../module/proker/ProkerRouter";
import eventRouter from "../module/events/EventRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/activities", activityRouter);
// Baca dulu (publik, GET saja), sisanya jatuh ke achievementRouter yang ber-verifyToken.
router.use("/achievements", achievementsRouter);
router.use("/achievements", achievementRouter);
router.use("/departments", departmentRouter);
router.use("/prokers", prokerRouter);
router.use("/events", eventRouter);

export default router;
