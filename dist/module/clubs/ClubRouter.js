"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClubController_1 = __importDefault(require("./ClubController"));
class ClubRouter {
    clubRouter;
    constructor() {
        this.clubRouter = express_1.default.Router();
        this.routes();
    }
    routes() {
        this.clubRouter.get("/:slug", ClubController_1.default.getClubBySlug);
    }
}
exports.default = new ClubRouter().clubRouter;
