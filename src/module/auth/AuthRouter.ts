import express from "express";
import AuthController from "@/module/auth/AuthController";

class AuthRouter {
  public authRouter;
  constructor() {
    this.authRouter = express.Router();
    this.routes();
  }

  private routes() {
    this.authRouter.post("/login", AuthController.login);
    this.authRouter.post("/register", AuthController.register);
  }
}

export default new AuthRouter().authRouter;
