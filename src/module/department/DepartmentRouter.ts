import express from "express";
import DepartmentController from "./DepartmentController";
class DepartmentRouter {
  public departmentRouter;

  constructor() {
    this.departmentRouter = express.Router();

    this.routes();
  }

  private routes() {
    this.departmentRouter.get("/:id", DepartmentController.getDepartmentById);
    this.departmentRouter.put("/:id", DepartmentController.updateDepartment);
  }
}

export default new DepartmentRouter().departmentRouter;
