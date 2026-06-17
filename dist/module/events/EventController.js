"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventService_1 = __importDefault(require("./EventService"));
class EventController {
    async getEvents(req, res) {
        try {
            const response = await EventService_1.default.getAllEvents();
            res.status(200).json(response);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getEvent(req, res) {
        try {
            const id = req.params.id;
            const response = await EventService_1.default.getEventById(id);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
exports.default = new EventController();
