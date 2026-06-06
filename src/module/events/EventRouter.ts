import express from "express";
import EventController from "./EventController";

class EventRouter {
  public eventRouter;

  constructor() {
    this.eventRouter = express.Router();
    this.routes();
  }

  private routes() {
    this.eventRouter.get("/", EventController.getEvents);
    this.eventRouter.get("/:id", EventController.getEvent);
  }
}

export default new EventRouter().eventRouter;