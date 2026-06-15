import { Request, Response } from "express";
import EventService from "./EventService";

class EventController {
  public async getEvents(req: Request, res: Response) {
    try {
      const response = await EventService.getAllEvents();
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getEvent(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await EventService.getEventById(id);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new EventController();