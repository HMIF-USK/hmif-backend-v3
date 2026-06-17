import { Request, Response } from "express";
import ActivityService from "./ActivityService";

class ActivityController {

  public async create(req: Request, res: Response) {
    try {
      const response = await ActivityService.create(req.body);
      res.status(201).json(response);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const response = await ActivityService.getById(req.params.id);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const division = req.query.division as string | undefined;
      const response = await ActivityService.getAll(division);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const response = await ActivityService.update(req.params.id, req.body);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const response = await ActivityService.delete(req.params.id);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new ActivityController();