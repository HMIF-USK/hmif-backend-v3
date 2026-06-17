"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EventController_1 = __importDefault(require("./EventController"));
class EventRouter {
    eventRouter;
    constructor() {
        this.eventRouter = express_1.default.Router();
        this.routes();
    }
    routes() {
        this.eventRouter.get("/", EventController_1.default.getEvents);
        this.eventRouter.get("/:id", EventController_1.default.getEvent);
    }
}
exports.default = new EventRouter().eventRouter;
