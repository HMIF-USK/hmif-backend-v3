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

    public postProker = async (req: Request, res: Response) => {
        try {
            const {
                name,
                departement_id,
                description,
                event_start,
                event_end,
                location,
                status
            } = req.body;

            // Validasi minimal
            if (!name || !departement_id || !event_start || !event_end) {
                return res.status(400).json({ message: "Field wajib belum terisi" });
            }

            const newProker = await ProkerService.createProker({
                name,
                departement_id,
                description,
                event_start: new Date(event_start), // Konversi string ke Date
                event_end: new Date(event_end),     // Konversi string ke Date
                location,
                status
            });
            res.status(201).json({ message: "Created" });
        } catch (error) {
            res.status(500).json({ message: "Error" });
        }
    };
}

export default new ProkerController();