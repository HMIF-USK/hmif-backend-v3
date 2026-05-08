import { Router } from "express";
import authRouter from "@/module/auth/AuthRouter";
import prokerRouter from "@/module/proker/ProkerRouter"; 

const router = Router();

router.use("/auth", authRouter);
router.use("/prokers", prokerRouter); 
export default router;