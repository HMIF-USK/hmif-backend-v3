import { Request, Response } from "express";
import ProkerService from "./ProkerService";


class ProkerController {
    // Gunakan arrow function ( => )
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
            console.error("DEBUG ERROR GET BY ID:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
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
                photos // Asumsi client mengirim array: ["url1", "url2"]
            } = req.body;

            // Validasi input
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
                photos || [] // Kirim array kosong jika tidak ada foto
            );

            return res.status(201).json({
                message: "Proker dan foto berhasil dibuat",
                data: newProker
            });

        } catch (error: any) {
            console.error("DEBUG ERROR:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    };
}

export default new ProkerController();