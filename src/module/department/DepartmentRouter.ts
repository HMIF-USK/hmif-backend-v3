import express from "express";
import DepartmentController from "./DepartmentController";
import { verifyToken } from "../../middleware/auth";

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
    this.departmentRouter.put("/:id", verifyToken, DepartmentController.updateDepartment);
    this.departmentRouter.post("/:id/photos", verifyToken, DepartmentController.addPhoto);
    this.departmentRouter.delete("/:id/photos/:photoId", verifyToken, DepartmentController.deletePhoto);
    this.departmentRouter.put("/:id/photos", verifyToken, DepartmentController.syncPhotos);
  }
}

export default new DepartmentRouter().departmentRouter;

