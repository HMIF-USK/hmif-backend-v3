import { Request, Response } from "express";
import DepartmentService from "./DepartmentService.ts";

class DepartmentController {

  public async getDepartmentById(req: Request, res: Response) {
    try {

      const response = await DepartmentService.getDepartmentById(
        req.params.id
      );

      res.status(200).json(response);

    } catch (error: any) {

      res.status(400).json({
        message: error.message
      });

    }
  }

  public async updateDepartment(req: Request, res: Response) {
    try {

      const response = await DepartmentService.updateDepartment(
        req.params.id,
        req.body
      );

      res.status(200).json(response);

    } catch (error: any) {

      res.status(400).json({
        message: error.message
      });

    }
  }

}

export default new DepartmentController();