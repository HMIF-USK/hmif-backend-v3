import { PrismaClient, prokerStatus } from "@prisma/client";

    const prisma = new PrismaClient();

    class ProkerService {

        public async getAllProkers() {
            // Kita gunakan include agar data departement-nya juga ikut terbawa
            return await prisma.proker.findMany({
                include: { departement: true }
            });
        }

        public async getProkerById(id: string) {
            return await prisma.proker.findUnique({
                where: { id },
                include: {
                    departement: true,   // Ambil detail departemen
                    fotoProkers: true,   // Ambil semua foto terkait
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

        public async updateProker(id: string, prokerData: any, photos: string[]) {
            return await prisma.$transaction(async (tx) => {
                // 1. Update data utama teks proker
                const updatedProker = await tx.proker.update({
                    where: { id },
                    data: {
                        ...prokerData,
                        updated_at: new Date()
                    }
                });

                // 2. Jika Frontend mengirimkan array photos, lakukan sinkronisasi pintar
                if (photos) {
                    // Ambil semua foto proker ini yang saat ini ada di database
                    const existingPhotos = await tx.fotoProker.findMany({
                        where: { proker_id: id }
                    });
                    const existingUrls = existingPhotos.map(f => f.url);

                    // A. Tentukan foto mana yang harus DIHAPUS
                    // (Ada di DB lama, tapi tidak dikirim lagi oleh Frontend)
                    const urlsToDelete = existingUrls.filter(url => !photos.includes(url));
                    if (urlsToDelete.length > 0) {
                        await tx.fotoProker.deleteMany({
                            where: {
                                proker_id: id,
                                url: { in: urlsToDelete }
                            }
                        });
                    }

                    // B. Tentukan foto mana yang BARU dan harus DITAMBAH
                    // (Dikirim oleh Frontend, tapi belum ada di DB lama)
                    const urlsToCreate = photos.filter(url => !existingUrls.includes(url));
                    if (urlsToCreate.length > 0) {
                        await tx.fotoProker.createMany({
                            data: urlsToCreate.map(url => ({
                                proker_id: id,
                                url: url
                            }))
                        });
                    }
                }

                // 3. Kembalikan hasil final beserta relasi foto yang sudah sinkron
                return await tx.proker.findUnique({
                    where: { id },
                    include: { fotoProkers: true }
                });
            });
        }
        
    }

    export default new ProkerService();