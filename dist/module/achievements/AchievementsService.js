"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AchievementsService {
    /**
     * Get all achievements
     */
    async getAllAchievements() {
        const achievements = await prisma.achievement.findMany({
            include: {
                fotoAchievements: {
                    select: {
                        id: true,
                        url: true
                    }
                }
            },
            orderBy: {
                created_at: "desc"
            }
        });
        return achievements;
    }
    /**
     * Get latest achievements with optional limit
     */
    async getLatestAchievements(query) {
        const limit = query.limit || 10;
        const achievements = await prisma.achievement.findMany({
            take: limit,
            include: {
                fotoAchievements: {
                    select: {
                        id: true,
                        url: true
                    }
                }
            },
            orderBy: {
                achievement_date: "desc"
            }
        });
        return achievements;
    }
    /**
     * Get achievement by ID
     */
    async getAchievementById(id) {
        const achievement = await prisma.achievement.findUnique({
            where: { id },
            include: {
                fotoAchievements: {
                    select: {
                        id: true,
                        url: true
                    }
                }
            }
        });
        if (!achievement) {
            throw new Error("Achievement not found");
        }
        return achievement;
    }
}
exports.default = new AchievementsService();
