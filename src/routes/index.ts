import { Router } from "express";
import authRouter from "@/module/auth/AuthRouter";

const router = Router();

router.use("/auth", authRouter);

export default router;
