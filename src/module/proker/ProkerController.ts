import { Request, Response } from "express";
import ProkerService from "./ProkerService";

class ProkerController {
    public getProkers = async (req: Request, res: Response) => {
        try {
            const data = await ProkerService.getAllProkers();
            res.status(200).json({ message: "Success", data });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };

    public getProkerById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = await ProkerService.getProkerById(id);

            if (!data) {
                return res.status(404).json({ message: "Program kerja tidak ditemukan" });
            }

            return res.status(200).json({ message: "Success", data });
        } catch (error: any) {
            console.error("DEBUG ERROR:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    public postProker = async (req: Request, res: Response) => {
        try {
            const {
                name,
                departement_id,
                description,
                event_start,
                event_end,
                location,
                status,
                photos
            } = req.body;

            if (!name || !departement_id || !event_start || !event_end) {
                return res.status(400).json({ message: "Data utama Proker wajib diisi" });
            }

            const newProker = await ProkerService.createProker(
                {
                    name,
                    departement_id,
                    description,
                    event_start: new Date(event_start),
                    event_end: new Date(event_end),
                    location,
                    status: status || "ComingSoon",
                },
                photos || []
            );
            
            return res.status(201).json({ message: "Program kerja berhasil dibuat", data: newProker });

        } catch (error: any) {
            console.error("DEBUG ERROR:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    };

    
    public deleteProker = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const checkProker = await ProkerService.getProkerById(id);
            if (!checkProker) {
                return res.status(404).json({ message: "Program kerja tidak ditemukan" });
            }

            await ProkerService.deleteProker(id);
            return res.status(200).json({ message: "Program kerja berhasil dihapus" });
        } catch (error: any) {
            console.error("DEBUG ERROR DELETE:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    };

    
    public updateProker = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const checkProker = await ProkerService.getProkerById(id);
            if (!checkProker) {
                return res.status(404).json({ message: "Program kerja tidak ditemukan" });
            }

            if (body.event_start) body.event_start = new Date(body.event_start);
            if (body.event_end) body.event_end = new Date(body.event_end);

            const updatedData = await ProkerService.updateProker(id, body);
            return res.status(200).json({ message: "Program kerja berhasil diperbarui", data: updatedData });
        } catch (error: any) {
            console.error("DEBUG ERROR PUT:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    };

}

export default new ProkerController();
