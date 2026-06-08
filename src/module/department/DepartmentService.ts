import { PrismaClient } from "@prisma/client";
import { PickUpdateDepartment } from "./department.types";

//bikin koneksi ke database
const prisma = new PrismaClient();

class DepartmentService {

    //GET department by id
  public async getDepartmentById(id: string) {

    const department = await prisma.departement.findUnique({
      where: {
        id
      }
    });

    if (!department) {
      throw new Error("Department not found");
    }

    return {
      message: "Success get department",
      data: department
    };
  }

  //PUT update department
  public async updateDepartment(id: string, payload: PickUpdateDepartment) {

    const department = await prisma.departement.update({
      where: {
        id
      },
      data: payload
    });

     return {
      message: "Success update department",
      data: department
    };
  }

}

export default new DepartmentService();