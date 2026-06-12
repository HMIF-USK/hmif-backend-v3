import express from "express";
import ActivityController from "@/module/activities/ActivityController";

class ActivityRouter {
  public activityRouter;

  constructor() {
    this.activityRouter = express.Router();
    this.routes();
  }

  private routes() {
    this.activityRouter.post("/", ActivityController.create);
    this.activityRouter.get("/", ActivityController.getAll);       // supports ?division=ppm
    this.activityRouter.get("/:id", ActivityController.getById);
    this.activityRouter.put("/:id", ActivityController.update);
    this.activityRouter.delete("/:id", ActivityController.delete);
  }
}

export default new ActivityRouter().activityRouter;