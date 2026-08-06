import express from "express";
import AuthController from "@/module/auth/AuthController";
import { verifyToken } from "@/middleware/auth";

class AuthRouter {
  public authRouter;
  constructor() {
    this.authRouter = express.Router();
    this.routes();
  }

  private routes() {
    this.authRouter.post("/login", AuthController.login);
    this.authRouter.post("/register", AuthController.register);
    this.authRouter.get("/profile", verifyToken, AuthController.profile);
  }
}

export default new AuthRouter().authRouter;
