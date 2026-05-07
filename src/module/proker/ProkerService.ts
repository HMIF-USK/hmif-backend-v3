import { PrismaClient, prokerStatus } from "@prisma/client";

const prisma = new PrismaClient();

class ProkerService {
    public async getAllProkers() {
        // Kita gunakan include agar data departement-nya juga ikut terbawa
        return await prisma.proker.findMany({
            include: { departement: true }
        });
    }
    // Sesuai Schema
    public async createProker(data: {
        name: string;
        departement_id: string;
        description: string;
        event_start: Date;
        event_end: Date;
        location: string;
        status?: prokerStatus;
    }) {
        return await prisma.proker.create({
            data,
        });
    }
}

export default new ProkerService();