"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ClubService {
    async getClubBySlug(slug) {
        const club = await prisma.departement.findFirst({
            where: {
                name: {
                    equals: slug,
                    mode: "insensitive",
                },
            },
            include: {
                fotoDepartements: true,
                prokers: true,
            },
        });
        if (!club) {
            throw new Error("Club not found");
        }
        return {
            message: "Success get club",
            data: club,
        };
    }
}
exports.default = new ClubService();
