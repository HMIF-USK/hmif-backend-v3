import express from "express";
import ClubController from "./ClubController";

class ClubRouter {
  public clubRouter;

  constructor() {
    this.clubRouter = express.Router();
    this.routes();
  }

  private routes() {
    this.clubRouter.get("/:slug", ClubController.getClubBySlug);
  }
}

export default new ClubRouter().clubRouter;
