"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ProkerService_1 = __importDefault(require("./ProkerService"));
/**
 * Departemen hanya boleh menyentuh proker miliknya sendiri; superUser bebas.
 * Mengembalikan pesan error kalau ditolak, atau null kalau boleh lanjut.
 */
const denyIfNotOwner = async (req, departementId) => {
    if (req.user.role === "superUser")
        return null;
    const own = await ProkerService_1.default.findDepartementIdByUser(req.user.id);
    if (!own)
        return "Akun ini tidak terhubung ke departemen mana pun";
    if (own !== departementId)
        return "Kamu hanya boleh mengelola event departemenmu sendiri";
    return null;
};
class ProkerController {
    getProkers = async (req, res) => {
        try {
            const data = await ProkerService_1.default.getAllProkers();
            res.status(200).json({ message: "Success", data });
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };
    getProkerById = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await ProkerService_1.default.getProkerById(id);
            if (!data) {
                return res.status(404).json({ message: "Program kerja tidak ditemukan" });
            }
            return res.status(200).json({ message: "Success", data });
        }
        catch (error) {
            console.error("DEBUG ERROR:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
    postProker = async (req, res) => {
        try {
            const { name, departement_id, description, event_start, event_end, location, status, photos } = req.body;
            // description & location NOT NULL di database — kalau lolos ke Prisma hasilnya 500, bukan 400.
            if (!name || !departement_id || !description || !location || !event_start || !event_end) {
                return res.status(400).json({ message: "Data utama Proker wajib diisi" });
            }
            // Status di luar enum akan ditolak Prisma sebagai 500, bukan 400.
            if (status && !Object.keys(client_1.prokerStatus).includes(status)) {
                return res.status(400).json({
                    message: `status harus salah satu dari: ${Object.keys(client_1.prokerStatus).join(", ")}`,
                });
            }
            if (isNaN(Date.parse(event_start)) || isNaN(Date.parse(event_end))) {
                return res.status(400).json({ message: "event_start/event_end harus format ISO 8601" });
            }
            if (Date.parse(event_end) < Date.parse(event_start)) {
                return res.status(400).json({ message: "event_end tidak boleh sebelum event_start" });
            }
            const denied = await denyIfNotOwner(req, departement_id);
            if (denied)
                return res.status(403).json({ message: denied });
            const newProker = await ProkerService_1.default.createProker({
                name,
                departement_id,
                description,
                event_start: new Date(event_start),
                event_end: new Date(event_end),
                location,
                status: status || "ComingSoon",
            }, photos || []);
            return res.status(201).json({ message: "Program kerja berhasil dibuat", data: newProker });
        }
        catch (error) {
            console.error("DEBUG ERROR:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    };
    deleteProker = async (req, res) => {
        try {
            const { id } = req.params;
            const checkProker = await ProkerService_1.default.getProkerById(id);
            if (!checkProker) {
                return res.status(404).json({ message: "Program kerja tidak ditemukan" });
            }
            const denied = await denyIfNotOwner(req, checkProker.departement_id);
            if (denied)
                return res.status(403).json({ message: denied });
            await ProkerService_1.default.deleteProker(id);
            return res.status(200).json({ message: "Program kerja berhasil dihapus" });
        }
        catch (error) {
            console.error("DEBUG ERROR DELETE:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    };
    updateProker = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, event_start, event_end, location, status, photos } = req.body;
            const checkProker = await ProkerService_1.default.getProkerById(id);
            if (!checkProker) {
                return res.status(404).json({ message: "Program kerja tidak ditemukan" });
            }
            const denied = await denyIfNotOwner(req, checkProker.departement_id);
            if (denied)
                return res.status(403).json({ message: denied });
            if (status && !Object.keys(client_1.prokerStatus).includes(status)) {
                return res.status(400).json({
                    message: `status harus salah satu dari: ${Object.keys(client_1.prokerStatus).join(", ")}`,
                });
            }
            for (const [field, value] of [["event_start", event_start], ["event_end", event_end]]) {
                if (value !== undefined && isNaN(Date.parse(value))) {
                    return res.status(400).json({ message: `${field} harus format ISO 8601` });
                }
            }
            const start = event_start ?? checkProker.event_start;
            const end = event_end ?? checkProker.event_end;
            if (new Date(end) < new Date(start)) {
                return res.status(400).json({ message: "event_end tidak boleh sebelum event_start" });
            }
            if (photos !== undefined && (!Array.isArray(photos) || photos.some((url) => typeof url !== "string" || !url.trim()))) {
                return res.status(400).json({ message: "photos harus berupa array URL" });
            }
            // Sengaja whitelist: departement_id & created_at tidak boleh dipindah lewat body.
            const updatedData = await ProkerService_1.default.updateProker(id, {
                name,
                description,
                location,
                status,
                event_start: event_start ? new Date(event_start) : undefined,
                event_end: event_end ? new Date(event_end) : undefined,
                photos,
            });
            return res.status(200).json({ message: "Program kerja berhasil diperbarui", data: updatedData });
        }
        catch (error) {
            console.error("DEBUG ERROR PUT:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    };
}
exports.default = new ProkerController();
