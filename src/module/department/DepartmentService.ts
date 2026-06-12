import { PrismaClient } from "@prisma/client";
import { PickUpdateDepartment } from "./department.types";
import { Response } from "express";

//bikin koneksi ke database
const prisma = new PrismaClient();

class DepartmentService {
  //GET department by id
  public async getDepartmentById(id: string) {
    const department = await prisma.departement.findUnique({
      where: {
        id,
      },
    });

    if (!department) {
      throw new Error("Department not found");
    }

    return {
      message: "Success get department",
      data: department,
    };
  }

  //PUT update department
  public async updateDepartment(
    id: string,
    payload: PickUpdateDepartment,
    res: Response,
  ) {
    const department = await prisma.departement.update({
      where: {
        id,
      },
      data: payload,
    });

    if (!department) {
      return res.status(400).json({
        status: 400,
        message: "query is invalid",
      });
    }

    return {
      message: "Success update department",
      data: department,
    };
  }
}

export default new DepartmentService();
