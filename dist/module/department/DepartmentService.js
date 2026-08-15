"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class DepartmentService {
    // GET all departments
    async getAllDepartments() {
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
    async getDepartmentById(id) {
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
    async getDepartmentBySlug(slug) {
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
    async findOrCreateDepartment(idOrSlug, user) {
        const normalized = idOrSlug.trim();
        let dept = await prisma.departement.findFirst({
            where: {
                OR: [
                    { id: normalized },
                    { slug: { equals: normalized, mode: "insensitive" } },
                    { name: { equals: normalized, mode: "insensitive" } },
                ],
            },
        });
        if (dept) {
            if (user && user.role !== "superUser" && dept.user_id !== user.id) {
                const err = new Error("Forbidden. Kamu hanya boleh mengelola departemenmu sendiri.");
                err.status = 403;
                throw err;
            }
            return dept;
        }
        const defaultUser = (user?.id && user.role !== "superUser")
            ? user.id
            : (await prisma.user.findFirst())?.id || "";
        dept = await prisma.departement.create({
            data: {
                name: normalized.toUpperCase(),
                slug: normalized.toLowerCase(),
                description: `Departemen ${normalized.toUpperCase()}`,
                user_id: defaultUser,
            },
        });
        return dept;
    }
    // PUT update department
    async updateDepartment(idOrSlug, payload, res, user) {
        const dept = await this.findOrCreateDepartment(idOrSlug, user);
        const department = await prisma.departement.update({
            where: {
                id: dept.id,
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
    async addPhoto(idOrSlug, payload, user) {
        const dept = await this.findOrCreateDepartment(idOrSlug, user);
        const photo = await prisma.fotoDepartement.create({
            data: {
                departement_id: dept.id,
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
    async deletePhoto(photoId, user) {
        const photo = await prisma.fotoDepartement.findUnique({ where: { id: photoId } });
        if (photo) {
            const dept = await prisma.departement.findUnique({ where: { id: photo.departement_id } });
            if (dept && user && user.role !== "superUser" && dept.user_id !== user.id) {
                const err = new Error("Forbidden. Kamu hanya boleh mengelola departemenmu sendiri.");
                err.status = 403;
                throw err;
            }
            await prisma.fotoDepartement.delete({
                where: { id: photoId },
            });
        }
        return {
            message: "Success delete photo",
        };
    }
    // PUT sync photos
    async syncPhotos(idOrSlug, photos, user) {
        const dept = await this.findOrCreateDepartment(idOrSlug, user);
        await prisma.fotoDepartement.deleteMany({
            where: { departement_id: dept.id },
        });
        if (photos && photos.length > 0) {
            await prisma.fotoDepartement.createMany({
                data: photos.map((p) => ({
                    departement_id: dept.id,
                    url: p.url,
                    namaFoto: p.namaFoto || "Foto",
                })),
            });
        }
        const updatedDepartment = await prisma.departement.findUnique({
            where: { id: dept.id },
            include: { fotoDepartements: true },
        });
        return {
            message: "Success sync department photos",
            data: updatedDepartment,
        };
    }
}
exports.default = new DepartmentService();
