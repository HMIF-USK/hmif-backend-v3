"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DepartmentController_1 = __importDefault(require("./DepartmentController"));
class DepartmentRouter {
    departmentRouter;
    constructor() {
        this.departmentRouter = express_1.default.Router();
        this.routes();
    }
    routes() {
        this.departmentRouter.get("/:id", DepartmentController_1.default.getDepartmentById);
        this.departmentRouter.put("/:id", DepartmentController_1.default.updateDepartment);
    }
}
exports.default = new DepartmentRouter().departmentRouter;
