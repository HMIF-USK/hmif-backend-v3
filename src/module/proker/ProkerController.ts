import { Request, Response } from "express";
import ProkerService from "./ProkerService";

class ProkerController {
    // Get biasa
    public getProkers = async (req: Request, res: Response) => {
        try {
            const data = await ProkerService.getAllProkers();
            res.status(200).json({ message: "Success", data });
        } catch (error: any) {
            console.error("ERROR GET PROKERS:", error); // <-- Tambahkan ini untuk intip penyakitnya
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    };


    // GET BY ID 
    public getProkerById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = await ProkerService.getProkerById(id);

            if (!data) {
                return res.status(404).json({ message: "Program kerja tidak ditemukan" });
            }

            return res.status(200).json({ message: "Success", data });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    // Post Proker
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


            return res.status(201).json({
                message: "Program kerja berhasil dibuat",
                data: newProker
            });

            
            return res.status(201).json({ message: "Program kerja berhasil dibuat", data: newProker });


        } catch (error: any) {
            console.error("DEBUG ERROR:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    };

    // Delete Proker
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

    // Update Proker
    public updateProker = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            // Pisahkan 'photos' dari sisa body data lainnya
            const { photos, ...prokerData } = req.body;

            // Cek apakah proker ada di database
            const checkProker = await ProkerService.getProkerById(id);
            if (!checkProker) {
                return res.status(404).json({ message: "Program kerja tidak ditemukan" });
            }

            // Konversi tanggal jika ada perubahan tanggal di dalam request body
            if (prokerData.event_start) prokerData.event_start = new Date(prokerData.event_start);
            if (prokerData.event_end) prokerData.event_end = new Date(prokerData.event_end);

            // Panggil service dengan parameter tambahan array photos
            const updatedData = await ProkerService.updateProker(id, prokerData, photos);

            return res.status(200).json({
                message: "Program kerja dan foto berhasil diperbarui",
                data: updatedData
            });
        } catch (error: any) {
            console.error("DEBUG ERROR PUT:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    };


}


export default new ProkerController();
