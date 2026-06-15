"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
//bikin koneksi ke database
const prisma = new client_1.PrismaClient();
class DepartmentService {
    //GET department by id
    async getDepartmentById(id) {
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
    async updateDepartment(id, payload, res) {
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
exports.default = new DepartmentService();
