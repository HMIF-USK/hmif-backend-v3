"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AchievementsController_1 = __importDefault(require("../../module/achievements/AchievementsController"));
class AchievementsRouter {
    achievementsRouter;
    constructor() {
        this.achievementsRouter = express_1.default.Router();
        this.routes();
    }
    routes() {
        // GET /achievements - Get all achievements
        this.achievementsRouter.get("/", AchievementsController_1.default.getAllAchievements);
        // GET /achievements/latest - Get latest achievements with optional limit
        this.achievementsRouter.get("/latest", AchievementsController_1.default.getLatestAchievements);
        // GET /achievements/:id - Get achievement by ID
        this.achievementsRouter.get("/:id", AchievementsController_1.default.getAchievementById);
    }
}
exports.default = new AchievementsRouter().achievementsRouter;
