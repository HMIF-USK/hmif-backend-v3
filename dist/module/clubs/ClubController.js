"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClubService_1 = __importDefault(require("./ClubService"));
class ClubController {
    async getClubBySlug(req, res) {
        try {
            const response = await ClubService_1.default.getClubBySlug(req.params.slug);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}
exports.default = new ClubController();
