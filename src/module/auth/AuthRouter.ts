import express from "express";
import AuthController from "@/module/auth/AuthController";
class AuthRouter {
  public authRouter;
  constructor() {
    this.authRouter = express.Router();
    this.routes();
  }

  private routes() {
    //  initial router
  }
}

export default new AuthRouter().authRouter;
