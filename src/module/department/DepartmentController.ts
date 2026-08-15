import { Request, Response, RequestHandler } from "express";
import DepartmentService from "./DepartmentService";

class DepartmentController {
  public getDepartments: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await DepartmentService.getAllDepartments();

      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

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

  public getDepartmentBySlug: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await DepartmentService.getDepartmentBySlug(req.params.slug);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(404).json({
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

  public addPhoto: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await DepartmentService.addPhoto(req.params.id, req.body);

      res.status(201).json(response);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  public deletePhoto: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await DepartmentService.deletePhoto(req.params.photoId);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  public syncPhotos: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await DepartmentService.syncPhotos(req.params.id, req.body.photos);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };
}

export default new DepartmentController();

