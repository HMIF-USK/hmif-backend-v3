import { Request, Response, RequestHandler } from "express";
import DepartmentService from "./DepartmentService";

class DepartmentController {

  public getDepartmentById: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {

      const response =
        await DepartmentService.getDepartmentById(
          req.params.id
        );

      res.status(200).json(response);

    } catch (error: any) {

      if (error.message === "Department not found") {
        res.status(404).json({
          message: error.message
        });
        return;
      }

      if (error.message === "Department id is required") {
        res.status(400).json({
          message: error.message
        });
        return;
      }

      res.status(500).json({
        message: "Internal Server Error"
      });
    }
  };

  public updateDepartment: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {

      const response =
        await DepartmentService.updateDepartment(
          req.params.id,
          req.body
        );

      res.status(200).json(response);

    } catch (error: any) {

      if (error.message === "Department not found") {
        res.status(404).json({
          message: error.message
        });
        return;
      }

      if (error.message === "Department id is required") {
        res.status(400).json({
          message: error.message
        });
        return;
      }

      res.status(500).json({
        message: "Internal Server Error"
      });
    }
  };

}

export default new DepartmentController();