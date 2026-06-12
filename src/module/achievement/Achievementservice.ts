import prisma from "@/lib/prisma";

interface CreateAchievementInput {
  title: string;
  description: string;
  location: string;
  achiever_name: string;
  achievement_date: Date;
  created_by_user_id: string;
  foto_urls?: string[];
}

interface UpdateAchievementInput {
  title?: string;
  description?: string;
  location?: string;
  achiever_name?: string;
  achievement_date?: Date;
  foto_urls?: string[];
}

export const achievementService = {
  async create(data: CreateAchievementInput) {
    const { foto_urls, ...achievementData } = data;

    const achievement = await prisma.achievement.create({
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

  async findById(id: string) {
    return prisma.achievement.findUnique({
      where: { id },
      include: {
        fotoAchievements: true,
        user: { select: { id: true, username: true } },
      },
    });
  },

  async update(id: string, data: UpdateAchievementInput) {
    const { foto_urls, ...achievementData } = data;

    if (foto_urls !== undefined) {
      await prisma.fotoAchievement.deleteMany({ where: { achievement_id: id } });
    }

    const achievement = await prisma.achievement.update({
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

  async remove(id: string) {
    await prisma.fotoAchievement.deleteMany({ where: { achievement_id: id } });
    return prisma.achievement.delete({ where: { id } });
  },
};