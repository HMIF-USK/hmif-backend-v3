"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProkerService {
    async getAllProkers() {
        // Kita gunakan include agar data departement-nya juga ikut terbawa
        return await prisma.proker.findMany({
            include: { departement: true },
        });
    }
    async getProkerById(id) {
        return await prisma.proker.findUnique({
            where: { id },
            include: {
                departement: true, // Ambil detail departemen
                fotoProkers: true, // Ambil semua foto terkait
            },
        });
    }
    async createProker(prokerData, photoUrls) {
        return await prisma.proker.create({
            data: {
                ...prokerData,
                // Nested write: membuat fotoProker secara otomatis
                fotoProkers: {
                    create: photoUrls.map((url) => ({ url })),
                },
            },
            include: {
                fotoProkers: true, // Kembalikan data foto juga di response
            },
        });
    }
    async deleteProker(id) {
        // 1. Hapus semua foto yang terikat dengan proker ini terlebih dahulu
        await prisma.fotoProker.deleteMany({
            where: { proker_id: id }
        });
        // 2. Baru hapus data Proker utamanya
        return await prisma.proker.delete({
            where: { id }
        });
    }
    async updateProker(id, data) {
        return await prisma.proker.update({
            where: { id },
            data: {
                ...data,
                updated_at: new Date() // Pastikan waktu update tercatat
            }
        });
    }
}
exports.default = new ProkerService();
