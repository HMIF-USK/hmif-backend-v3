import { Request, Response } from "express";
import { JwtPayload } from "@/types";
import AuthService from "./AuthService";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

class AuthController {
  public async login(req: Request, res: Response) {
    try {
      const response = await AuthService.login(req.body);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new AuthController();
