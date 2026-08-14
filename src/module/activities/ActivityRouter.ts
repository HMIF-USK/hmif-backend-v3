import express from "express";
import ActivityController from "./ActivityController";
import { verifyToken, requireDepartement } from "../../middleware/auth";

// Kegiatan Informatic Club diisi departemen PPM; baca tetap publik.
const onlyPPM = [verifyToken, requireDepartement("PPM")];

class ActivityRouter {
  public activityRouter;

  constructor() {
    this.activityRouter = express.Router();
    this.routes();
  }

  private routes() {
    this.activityRouter.post("/", onlyPPM, ActivityController.create);
    this.activityRouter.get("/", ActivityController.getAll);       // supports ?division=
    this.activityRouter.get("/:id", ActivityController.getById);
    this.activityRouter.put("/:id", onlyPPM, ActivityController.update);
    this.activityRouter.delete("/:id", onlyPPM, ActivityController.delete);
  }
}

export default new ActivityRouter().activityRouter;