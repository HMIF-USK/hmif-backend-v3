import { PrismaClient } from "@prisma/client";
import { AchievementResponse, GetAchievementsQuery } from "./achievements.types";

const prisma = new PrismaClient();

class AchievementsService {
  /**
   * Get all achievements
   */
  public async getAllAchievements(): Promise<AchievementResponse[]> {
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

    return achievements as AchievementResponse[];
  }

  /**
   * Get latest achievements with optional limit
   */
  public async getLatestAchievements(query: GetAchievementsQuery): Promise<AchievementResponse[]> {
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

    return achievements as AchievementResponse[];
  }

  /**
   * Get achievement by ID
   */
  public async getAchievementById(id: string): Promise<AchievementResponse> {
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

    return achievement as AchievementResponse;
  }
}

export default new AchievementsService();
