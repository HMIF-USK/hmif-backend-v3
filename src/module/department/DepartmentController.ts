import { Request, Response, RequestHandler } from "express";
import DepartmentService from "./DepartmentService";

class DepartmentController {
  public getDepartmentById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await DepartmentService.getDepartmentById(req.params.id);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  public updateDepartment: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await DepartmentService.updateDepartment(
        req.params.id,
        req.body,
        res,
      );

      if (!response) {
        res.status(400).json({
          status: 400,
          message: "service internal error",
        });
        return;
      }

      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };
}

export default new DepartmentController();
