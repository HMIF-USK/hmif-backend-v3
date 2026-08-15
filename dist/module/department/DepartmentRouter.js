"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DepartmentController_1 = __importDefault(require("./DepartmentController"));
const auth_1 = require("../../middleware/auth");
class DepartmentRouter {
    departmentRouter;
    constructor() {
        this.departmentRouter = express_1.default.Router();
        this.routes();
    }
    routes() {
        this.departmentRouter.get("/", DepartmentController_1.default.getDepartments);
        this.departmentRouter.get("/slug/:slug", DepartmentController_1.default.getDepartmentBySlug);
        this.departmentRouter.get("/:id", DepartmentController_1.default.getDepartmentById);
        this.departmentRouter.put("/:id", auth_1.verifyToken, DepartmentController_1.default.updateDepartment);
        this.departmentRouter.post("/:id/photos", auth_1.verifyToken, DepartmentController_1.default.addPhoto);
        this.departmentRouter.delete("/:id/photos/:photoId", auth_1.verifyToken, DepartmentController_1.default.deletePhoto);
        this.departmentRouter.put("/:id/photos", auth_1.verifyToken, DepartmentController_1.default.syncPhotos);
    }
}
exports.default = new DepartmentRouter().departmentRouter;
