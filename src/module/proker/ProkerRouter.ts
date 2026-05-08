// ProkerRouter.ts
import express, { Request, Response, NextFunction } from "express";
import prokerController from "@/module/proker/ProkerController";

const prokerRouter = express.Router();

// Wrap handlers properly with explicit typing -- Ini eror memang gilerr sia
prokerRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  prokerController.getProkers(req, res).catch(next);
});

prokerRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  prokerController.postProker(req, res).catch(next);
});

export default prokerRouter;