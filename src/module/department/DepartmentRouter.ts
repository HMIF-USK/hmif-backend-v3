import express from "express";
import DepartmentController from "./DepartmentController";
class DepartmentRouter {
  public departmentRouter;

  constructor() {
    this.departmentRouter = express.Router();

    this.routes();
  }

  private routes() {
    this.departmentRouter.get("/", DepartmentController.getDepartments);
    this.departmentRouter.get("/slug/:slug", DepartmentController.getDepartmentBySlug);
    this.departmentRouter.get("/:id", DepartmentController.getDepartmentById);
    this.departmentRouter.put("/:id", DepartmentController.updateDepartment);
    this.departmentRouter.post("/:id/photos", DepartmentController.addPhoto);
    this.departmentRouter.delete("/:id/photos/:photoId", DepartmentController.deletePhoto);
    this.departmentRouter.put("/:id/photos", DepartmentController.syncPhotos);
  }
}

export default new DepartmentRouter().departmentRouter;

