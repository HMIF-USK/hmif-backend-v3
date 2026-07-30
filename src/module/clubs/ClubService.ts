import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ClubService {
  public async getClubBySlug(slug: string) {
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

export default new ClubService();
