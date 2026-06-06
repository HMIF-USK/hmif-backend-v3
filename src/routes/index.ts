import { Router } from "express";
import authRouter from "@/module/auth/AuthRouter";
import achievementRouter from "@/module/achievement/Achievementrouter";
import departmentRouter from "@/module/department/DepartmentRouter";
import prokerRouter from "@/module/proker/ProkerRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/achievements", achievementRouter);
router.use("/departments", departmentRouter);
router.use("/prokers", prokerRouter);

export default router;