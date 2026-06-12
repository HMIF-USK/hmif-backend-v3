import { Request, Response } from "express";
import { JwtPayload } from "@/types";
import AuthService from "./AuthService";
import { PickRegister } from "./auth.types";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

class AuthController {
  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await AuthService.login(req.body, res);

      if (!response) {
        res.status(400).json({
          message: "service not found",
          status: 400,
        });
        return;
      }
      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json({
        message: "server intenal error",
        status: 500,
        error: error,
      });
      return;
    }
  };
  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const payload: PickRegister = req.body;

      const service = await AuthService.registerDeveloper(payload, res);

      if (!service) {
        res.status(400).json({
          status: 400,
          message: "service not respone",
        });
        return;
      }
      res.status(201).json({
        message: "successful create users",
        data: service,
        status: 201,
      });
    } catch (error) {
      res.status(500).json({
        nessage: "server internal error",
        status: 500,
        error: error,
      });
      return;
    }
  };
}

export default new AuthController();
