import { PrismaClient } from "@prisma/client";
import { IAddPhotoPayload, IDepartmentPhoto, PickUpdateDepartment } from "./department.types";
import { Response } from "express";

const prisma = new PrismaClient();

class DepartmentService {
  // GET all departments
  public async getAllDepartments() {
    const departments = await prisma.departement.findMany({
      include: { fotoDepartements: true },
      orderBy: { name: "asc" },
    });

    return {
      message: "Success get departments",
      data: departments,
    };
  }

  // GET department by id
  public async getDepartmentById(id: string) {
    const department = await prisma.departement.findUnique({
      where: {
        id,
      },
      include: { fotoDepartements: true },
    });

    if (!department) {
      throw new Error("Department not found");
    }

    return {
      message: "Success get department",
      data: department,
    };
  }

  // GET department by slug
  public async getDepartmentBySlug(slug: string) {
    const normalizedSlug = slug.toLowerCase().trim();

    let department = await prisma.departement.findFirst({
      where: {
        OR: [
          { slug: { equals: normalizedSlug, mode: "insensitive" } },
          { name: { equals: normalizedSlug, mode: "insensitive" } },
        ],
      },
      include: { fotoDepartements: true },
    });

    if (!department) {
      department = await prisma.departement.findFirst({
        where: {
          name: { contains: normalizedSlug, mode: "insensitive" },
        },
        include: { fotoDepartements: true },
      });
    }

    if (!department) {
      throw new Error("Department not found");
    }

    return {
      message: "Success get department by slug",
      data: department,
    };
  }

  // PUT update department
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
      include: { fotoDepartements: true },
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

  // POST add photo
  public async addPhoto(departmentId: string, payload: IAddPhotoPayload) {
    const photo = await prisma.fotoDepartement.create({
      data: {
        departement_id: departmentId,
        url: payload.url,
        namaFoto: payload.namaFoto,
      },
    });

    return {
      message: "Success add photo",
      data: photo,
    };
  }

  // DELETE photo
  public async deletePhoto(photoId: string) {
    await prisma.fotoDepartement.delete({
      where: { id: photoId },
    });

    return {
      message: "Success delete photo",
    };
  }

  // PUT sync photos
  public async syncPhotos(departmentId: string, photos: IDepartmentPhoto[]) {
    await prisma.fotoDepartement.deleteMany({
      where: { departement_id: departmentId },
    });

    if (photos && photos.length > 0) {
      await prisma.fotoDepartement.createMany({
        data: photos.map((p) => ({
          departement_id: departmentId,
          url: p.url,
          namaFoto: p.namaFoto || "Foto",
        })),
      });
    }

    const updatedDepartment = await prisma.departement.findUnique({
      where: { id: departmentId },
      include: { fotoDepartements: true },
    });

    return {
      message: "Success sync department photos",
      data: updatedDepartment,
    };
  }
}

export default new DepartmentService();

