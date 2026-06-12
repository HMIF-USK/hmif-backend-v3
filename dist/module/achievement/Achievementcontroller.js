"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.achievementController = void 0;
const Achievementservice_1 = require("../../module/achievement/Achievementservice");
exports.achievementController = {
    // POST /achievements
    async create(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ success: false, message: "Unauthorized" });
                return;
            }
            const { title, description, location, achiever_name, achievement_date, foto_urls } = req.body;
            const achievement = await Achievementservice_1.achievementService.create({
                title,
                description,
                location,
                achiever_name,
                achievement_date: new Date(achievement_date),
                created_by_user_id: userId,
                foto_urls: foto_urls || [],
            });
            res.status(201).json({
                success: true,
                message: "Achievement berhasil dibuat",
                data: achievement,
            });
        }
        catch (error) {
            next(error);
        }
    },
    // PUT /achievements/:id
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ success: false, message: "Unauthorized" });
                return;
            }
            const existing = await Achievementservice_1.achievementService.findById(id); // id sudah String, tidak perlu Number()
            if (!existing) {
                res.status(404).json({ success: false, message: "Achievement tidak ditemukan" });
                return;
            }
            const { title, description, location, achiever_name, achievement_date, foto_urls } = req.body;
            const updated = await Achievementservice_1.achievementService.update(id, {
                title,
                description,
                location,
                achiever_name,
                achievement_date: achievement_date ? new Date(achievement_date) : undefined,
                foto_urls,
            });
            res.status(200).json({
                success: true,
                message: "Achievement berhasil diperbarui",
                data: updated,
            });
        }
        catch (error) {
            next(error);
        }
    },
    // DELETE /achievements/:id
    async remove(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ success: false, message: "Unauthorized" });
                return;
            }
            const existing = await Achievementservice_1.achievementService.findById(id);
            if (!existing) {
                res.status(404).json({ success: false, message: "Achievement tidak ditemukan" });
                return;
            }
            await Achievementservice_1.achievementService.remove(id);
            res.status(200).json({
                success: true,
                message: "Achievement berhasil dihapus",
            });
        }
        catch (error) {
            next(error);
        }
    },
};
