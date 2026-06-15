"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.achievementService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
exports.achievementService = {
    async create(data) {
        const { foto_urls, ...achievementData } = data;
        const achievement = await prisma_1.default.achievement.create({
            data: {
                ...achievementData,
                fotoAchievements: foto_urls && foto_urls.length > 0
                    ? { create: foto_urls.map((url) => ({ url })) }
                    : undefined,
            },
            include: {
                fotoAchievements: true,
                user: { select: { id: true, username: true } },
            },
        });
        return achievement;
    },
    async findById(id) {
        return prisma_1.default.achievement.findUnique({
            where: { id },
            include: {
                fotoAchievements: true,
                user: { select: { id: true, username: true } },
            },
        });
    },
    async update(id, data) {
        const { foto_urls, ...achievementData } = data;
        if (foto_urls !== undefined) {
            await prisma_1.default.fotoAchievement.deleteMany({ where: { achievement_id: id } });
        }
        const achievement = await prisma_1.default.achievement.update({
            where: { id },
            data: {
                ...achievementData,
                fotoAchievements: foto_urls !== undefined
                    ? { create: foto_urls.map((url) => ({ url })) }
                    : undefined,
            },
            include: {
                fotoAchievements: true,
                user: { select: { id: true, username: true } },
            },
        });
        return achievement;
    },
    async remove(id) {
        await prisma_1.default.fotoAchievement.deleteMany({ where: { achievement_id: id } });
        return prisma_1.default.achievement.delete({ where: { id } });
    },
};
