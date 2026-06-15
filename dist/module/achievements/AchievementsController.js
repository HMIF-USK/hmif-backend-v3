"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AchievementsService_1 = __importDefault(require("./AchievementsService"));
class AchievementsController {
    /**
     * GET /achievements
     * Get all achievements
     */
    async getAllAchievements(req, res) {
        try {
            const achievements = await AchievementsService_1.default.getAllAchievements();
            res.status(200).json({
                message: "Achievements retrieved successfully",
                data: achievements
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    /**
     * GET /achievements/latest
     * Get latest achievements with optional limit query
     */
    async getLatestAchievements(req, res) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
            const achievements = await AchievementsService_1.default.getLatestAchievements({ limit });
            res.status(200).json({
                message: "Latest achievements retrieved successfully",
                data: achievements
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    /**
     * GET /achievements/:id
     * Get achievement by ID
     */
    async getAchievementById(req, res) {
        try {
            const { id } = req.params;
            const achievement = await AchievementsService_1.default.getAchievementById(id);
            res.status(200).json({
                message: "Achievement retrieved successfully",
                data: achievement
            });
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}
exports.default = new AchievementsController();
