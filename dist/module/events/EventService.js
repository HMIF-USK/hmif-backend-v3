"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EventService {
    async getAllEvents() {
        const events = await prisma.proker.findMany({
            where: {
                status: {
                    not: "ComingSoon"
                }
            },
            select: {
                id: true,
                name: true,
                description: true,
                event_start: true,
                event_end: true,
                location: true
            },
            orderBy: {
                event_start: "desc"
            }
        });
        return {
            message: "Success get events",
            data: events
        };
    }
    async getEventById(id) {
        const event = await prisma.proker.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                description: true,
                event_start: true,
                event_end: true,
                location: true
            }
        });
        if (!event) {
            throw new Error("Event tidak ditemukan");
        }
        return {
            message: "Success get event",
            data: event
        };
    }
}
exports.default = new EventService();
