import { PrismaClient, prokerStatus } from "@prisma/client";

const prisma = new PrismaClient();

class ProkerService {
  public async getAllProkers() {
    // Kita gunakan include agar data departement-nya juga ikut terbawa
    return await prisma.proker.findMany({
      include: { departement: true },
    });
  }

  public async getProkerById(id: string) {
    return await prisma.proker.findUnique({
      where: { id },
      include: {
        departement: true, // Ambil detail departemen
        fotoProkers: true, // Ambil semua foto terkait
      },
    });
  }

  public async createProker(
    prokerData: {
      name: string;
      departement_id: string;
      description: string;
      event_start: Date;
      event_end: Date;
      location: string;
      status?: prokerStatus;
    },
    photoUrls: string[], // Tambahkan parameter untuk array URL foto
  ) {
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
}

        public async createProker(
            prokerData: {
                name: string;
                departement_id: string;
                description: string;
                event_start: Date;
                event_end: Date;
                location: string;
                status?: prokerStatus;
            },
            photoUrls: string[] // Tambahkan parameter untuk array URL foto
        ) {
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

        public async deleteProker(id: string) {
            // 1. Hapus semua foto yang terikat dengan proker ini terlebih dahulu
            await prisma.fotoProker.deleteMany({
                where: { proker_id: id }
            });

            // 2. Baru hapus data Proker utamanya
            return await prisma.proker.delete({
                where: { id }
            });
        }

        public async updateProker(id: string, data: any) {
            return await prisma.proker.update({
                where: { id },
                data: {
                    ...data,
                    updated_at: new Date() // Pastikan waktu update tercatat
                }
            });
        }
    }

    export default new ProkerService();
