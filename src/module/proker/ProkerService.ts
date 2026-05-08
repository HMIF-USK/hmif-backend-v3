 import { PrismaClient, prokerStatus } from "@prisma/client";

    const prisma = new PrismaClient();

    class ProkerService {

        public async getAllProkers() {
            // Kita gunakan include agar data departement-nya juga ikut terbawa
            return await prisma.proker.findMany({
                include: { departement: true }
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
    }

    export default new ProkerService();