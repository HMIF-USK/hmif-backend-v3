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

// Tambahkan di dalam file ProkerRouter.ts kamu
prokerRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  prokerController.getProkerById(req, res).catch(next);
});

// Endpoint untuk menghapus Proker berdasarkan ID
prokerRouter.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  prokerController.deleteProker(req, res).catch(next);
});

// Endpoint untuk memperbarui Proker berdasarkan ID
prokerRouter.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  prokerController.updateProker(req, res).catch(next);
});

export default prokerRouter;
