import { Request, Response } from "express";
import ClubService from "./ClubService";

class ClubController {
  public async getClubBySlug(req: Request, res: Response) {
    try {
      const response = await ClubService.getClubBySlug(req.params.slug);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new ClubController();
