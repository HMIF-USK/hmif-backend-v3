import express from "express";
import ProkerController from "@/module/proker/ProkerController";

class ProkerRouter {
  public prokerRouter;
  constructor() {
    this.prokerRouter = express.Router();
    this.routes();
  }

  private routes() {
    this.prokerRouter.get("/", ProkerController.getProkers);
    // Gunakan 'as any' hanya jika benar-benar darurat untuk tes apakah jalan
    this.prokerRouter.post("/", ProkerController.postProker as any);
  }
}

export default new ProkerRouter().prokerRouter;