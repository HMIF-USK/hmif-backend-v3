import { Request, Response } from "express";
import ProkerService from "./ProkerService";


/**
 * @swagger
 * tags:
 * name: Proker
 * description: Manajemen Program Kerja Himpunan
 */
class ProkerController {

    /**
     * @swagger
     * /api/prokers:
     * get:
     * summary: Mengambil semua data program kerja
     * tags: [Proker]
     * responses:
     * 200:
     * description: Berhasil mengambil semua data proker
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * message: { type: string, example: "Success" }
     * data:
     * type: array
     * items:
     * $ref: '#/components/schemas/Proker'
     * 500:
     * description: Internal server error
     */
    public getProkers = async (req: Request, res: Response) => {
        try {
            const data = await ProkerService.getAllProkers();
            res.status(200).json({ message: "Success", data });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };

    /**
     * @swagger
     * /api/prokers/{id}:
     * get:
     * summary: Mengambil detail satu proker berdasarkan ID
     * tags: [Proker]
     * parameters:
     * - in: path
     * name: id
     * required: true
     * schema:
     * type: string
     * description: UUID dari program kerja yang dicari
     * responses:
     * 200:
     * description: Data proker ditemukan
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * message: { type: string, example: "Success" }
     * data:
     * $ref: '#/components/schemas/Proker'
     * 404:
     * description: Program kerja tidak ditemukan
     * 500:
     * description: Internal server error
     */
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

    /**
     * @swagger
     * /api/prokers:
     * post:
     * summary: Membuat program kerja baru beserta foto terkait
     * tags: [Proker]
     * requestBody:
     * required: true
     * content:
     * application/json:
     * schema:
     * type: object
     * required:
     * - name
     * - departement_id
     * - event_start
     * - event_end
     * properties:
     * name: { type: string, example: "Makrab Informatika" }
     * departement_id: { type: string, example: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d" }
     * description: { type: string, example: "Acara keakraban mahasiswa" }
     * event_start: { type: string, format: date-time, example: "2026-06-05T12:00:00Z" }
     * event_end: { type: string, format: date-time, example: "2026-06-06T12:00:00Z" }
     * location: { type: string, example: "Lampuuk" }
     * status: { $ref: '#/components/schemas/ProkerStatus' }
     * photos: 
     * type: array
     * items: { type: string }
     * example: ["https://linkfoto.com/1.png", "https://linkfoto.com/2.png"]
     * responses:
     * 201:
     * description: Proker dan foto berhasil dibuat
     * 400:
     * description: Data utama Proker wajib diisi
     * 500:
     * description: Internal Server Error
     */
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

    /**
     * @swagger
     * /api/prokers/{id}:
     * delete:
     * summary: Menghapus program kerja berdasarkan ID
     * tags: [Proker]
     * parameters:
     * - in: path
     * name: id
     * required: true
     * schema:
     * type: string
     * description: UUID dari program kerja yang ingin dihapus
     * responses:
     * 200:
     * description: Program kerja berhasil dihapus
     * 404:
     * description: Program kerja tidak ditemukan
     * 500:
     * description: Internal server error
     */
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

    /**
     * @swagger
     * /api/prokers/{id}:
     * put:
     * summary: Memperbarui data program kerja berdasarkan ID
     * tags: [Proker]
     * parameters:
     * - in: path
     * name: id
     * required: true
     * schema:
     * type: string
     * description: UUID dari program kerja yang ingin diupdate
     * requestBody:
     * required: true
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * name: { type: string, example: "Nama Proker Baru" }
     * description: { type: string, example: "Deskripsi baru" }
     * status: { $ref: '#/components/schemas/ProkerStatus' }
     * location: { type: string, example: "Aula Baru" }
     * responses:
     * 200:
     * description: Program kerja berhasil diperbarui
     * 404:
     * description: Program kerja tidak ditemukan
     * 500:
     * description: Internal server error
     */
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