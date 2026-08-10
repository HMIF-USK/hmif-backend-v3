const achievementBody = {
  type: "object",
  required: ["title", "description", "location", "achiever_name", "achievement_date"],
  properties: {
    title: { type: "string", example: "Juara 1 Hackathon Nasional 2026" },
    description: { type: "string", example: "Deskripsi lengkap pencapaian" },
    location: { type: "string", example: "Jakarta" },
    achiever_name: {
      type: "string",
      example: "Kemendikbud - Kementerian Pendidikan dan Kebudayaan",
    },
    achievement_date: { type: "string", format: "date-time", example: "2026-08-01" },
    achievement_end_date: {
      type: "string",
      format: "date-time",
      nullable: true,
      example: "2026-08-03",
      description: "Opsional, tidak boleh lebih awal dari achievement_date",
    },
    level: {
      type: "string",
      nullable: true,
      example: "nasional",
      description: "Tingkat: internasional | nasional | provinsi | kabupaten | universitas",
    },
    foto_urls: {
      type: "array",
      items: { type: "string" },
      description:
        "URL foto hasil upload. File diunggah langsung dari browser ke Cloudinary (unsigned preset), backend hanya menyimpan URL-nya.",
      example: ["https://res.cloudinary.com/demo/image/upload/v1/hmif/foto.jpg"],
    },
  },
};

export const achievementPaths = {
  "/api/achievements": {
    get: {
      summary: "Mengambil semua achievement (publik)",
      tags: ["Achievement"],
      responses: { 200: { description: "Success" } },
    },
    post: {
      summary: "Membuat achievement baru",
      description:
        "Butuh login. Hanya role `mba` dan `superUser` yang diizinkan, role `departement` dapat 403.",
      tags: ["Achievement"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: { "application/json": { schema: achievementBody } },
      },
      responses: {
        201: { description: "Achievement berhasil dibuat" },
        400: { description: "Validasi gagal" },
        401: { description: "Token tidak ada / tidak valid" },
        403: { description: "Role tidak diizinkan" },
      },
    },
  },
  "/api/achievements/{id}": {
    get: {
      summary: "Mengambil satu achievement (publik)",
      tags: ["Achievement"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
      ],
      responses: { 200: { description: "Success" }, 404: { description: "Tidak ditemukan" } },
    },
    put: {
      summary: "Memperbarui achievement (role mba / superUser)",
      tags: ["Achievement"],
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { ...achievementBody, required: [] },
          },
        },
      },
      responses: {
        200: { description: "Berhasil diperbarui" },
        403: { description: "Role tidak diizinkan" },
        404: { description: "Tidak ditemukan" },
      },
    },
    delete: {
      summary: "Menghapus achievement (role mba / superUser)",
      tags: ["Achievement"],
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
      ],
      responses: {
        200: { description: "Berhasil dihapus" },
        403: { description: "Role tidak diizinkan" },
        404: { description: "Tidak ditemukan" },
      },
    },
  },
};
