"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProkerService_1 = __importDefault(require("./ProkerService"));
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
            if (!name || !departement_id || !event_start || !event_end) {
                return res.status(400).json({ message: "Data utama Proker wajib diisi" });
            }
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
            const body = req.body;
            const checkProker = await ProkerService_1.default.getProkerById(id);
            if (!checkProker) {
                return res.status(404).json({ message: "Program kerja tidak ditemukan" });
            }
            if (body.event_start)
                body.event_start = new Date(body.event_start);
            if (body.event_end)
                body.event_end = new Date(body.event_end);
            const updatedData = await ProkerService_1.default.updateProker(id, body);
            return res.status(200).json({ message: "Program kerja berhasil diperbarui", data: updatedData });
        }
        catch (error) {
            console.error("DEBUG ERROR PUT:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    };
}
exports.default = new ProkerController();
