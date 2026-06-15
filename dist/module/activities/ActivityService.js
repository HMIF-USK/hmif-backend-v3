"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ActivityService {
    async create(payload) {
        const { photos, ...activityData } = payload;
        const activity = await prisma.activity.create({
            data: {
                ...activityData,
                event_start: new Date(activityData.event_start),
                event_end: new Date(activityData.event_end),
                fotoActivities: photos?.length
                    ? { create: photos.map((url) => ({ url })) }
                    : undefined,
            },
            include: { fotoActivities: true },
        });
        return activity;
    }
    async getById(id) {
        const activity = await prisma.activity.findUnique({
            where: { id },
            include: { fotoActivities: true, user: { select: { id: true, username: true } } },
        });
        if (!activity)
            throw new Error("Activity not found");
        return activity;
    }
    async getAll(division) {
        const activities = await prisma.activity.findMany({
            where: division ? { division } : undefined,
            include: { fotoActivities: true },
            orderBy: { created_at: "desc" },
        });
        return activities;
    }
    async update(id, payload) {
        const { photos, ...activityData } = payload;
        const exists = await prisma.activity.findUnique({ where: { id } });
        if (!exists)
            throw new Error("Activity not found");
        const activity = await prisma.activity.update({
            where: { id },
            data: {
                ...activityData,
                ...(activityData.event_start && { event_start: new Date(activityData.event_start) }),
                ...(activityData.event_end && { event_end: new Date(activityData.event_end) }),
                updated_at: new Date(),
                ...(photos && {
                    fotoActivities: {
                        deleteMany: {},
                        create: photos.map((url) => ({ url })),
                    },
                }),
            },
            include: { fotoActivities: true },
        });
        return activity;
    }
    async delete(id) {
        const exists = await prisma.activity.findUnique({ where: { id } });
        if (!exists)
            throw new Error("Activity not found");
        await prisma.activity.delete({ where: { id } });
        return { message: "Activity deleted successfully" };
    }
}
exports.default = new ActivityService();
