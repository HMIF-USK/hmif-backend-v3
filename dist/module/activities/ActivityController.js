"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActivityService_1 = __importDefault(require("./ActivityService"));
class ActivityController {
    async create(req, res) {
        try {
            const response = await ActivityService_1.default.create(req.body);
            res.status(201).json(response);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getById(req, res) {
        try {
            const response = await ActivityService_1.default.getById(req.params.id);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    async getAll(req, res) {
        try {
            const division = req.query.division;
            const response = await ActivityService_1.default.getAll(division);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async update(req, res) {
        try {
            const response = await ActivityService_1.default.update(req.params.id, req.body);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async delete(req, res) {
        try {
            const response = await ActivityService_1.default.delete(req.params.id);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
exports.default = new ActivityController();
