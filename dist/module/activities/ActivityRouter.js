"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ActivityController_1 = __importDefault(require("./ActivityController"));
const auth_1 = require("../../middleware/auth");
// Kegiatan Informatic Club diisi departemen PPM; baca tetap publik.
const onlyPPM = [auth_1.verifyToken, (0, auth_1.requireDepartement)("PPM")];
class ActivityRouter {
    activityRouter;
    constructor() {
        this.activityRouter = express_1.default.Router();
        this.routes();
    }
    routes() {
        this.activityRouter.post("/", onlyPPM, ActivityController_1.default.create);
        this.activityRouter.get("/", ActivityController_1.default.getAll); // supports ?division=
        this.activityRouter.get("/:id", ActivityController_1.default.getById);
        this.activityRouter.put("/:id", onlyPPM, ActivityController_1.default.update);
        this.activityRouter.delete("/:id", onlyPPM, ActivityController_1.default.delete);
    }
}
exports.default = new ActivityRouter().activityRouter;
