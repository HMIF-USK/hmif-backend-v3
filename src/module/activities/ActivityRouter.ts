import express from "express";
import ActivityController from "./ActivityController";
import { verifyToken } from "../../middleware/auth";

class ActivityRouter {
  public activityRouter;

  constructor() {
    this.activityRouter = express.Router();
    this.routes();
  }

  private routes() {
    this.activityRouter.post("/", verifyToken, ActivityController.create);
    this.activityRouter.get("/", ActivityController.getAll);       // supports ?division=ppm
    this.activityRouter.get("/:id", ActivityController.getById);
    this.activityRouter.put("/:id", verifyToken, ActivityController.update);
    this.activityRouter.delete("/:id", verifyToken, ActivityController.delete);
  }
}

export default new ActivityRouter().activityRouter;