export const prokerPaths = {
  "/api/prokers": {
    get: {
      summary: "Mengambil semua data program kerja",
      tags: ["Proker"],
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Success" },
                  data: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Proker" },
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Membuat program kerja baru beserta foto terkait",
      tags: ["Proker"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "name",
                "departement_id",
                "event_start",
                "event_end",
              ],
              properties: {
                name: { type: "string", example: "Makrab Informatika" },
                departement_id: {
                  type: "string",
                  example: "uuid-dept-kamu",
                },
                description: { type: "string", example: "Acara keakraban" },
                event_start: {
                  type: "string",
                  format: "date-time",
                  example: "2026-06-05T12:00:00Z",
                },
                event_end: {
                  type: "string",
                  format: "date-time",
                  example: "2026-06-06T12:00:00Z",
                },
                location: { type: "string", example: "Lampuuk" },
                status: { $ref: "#/components/schemas/ProkerStatus" },
                photos: {
                  type: "array",
                  items: { type: "string" },
                  example: ["https://linkfoto.com/1.png"],
                },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Created" },
      },
    },
  },
  "/api/prokers/{id}": {
    get: {
      summary: "Mengambil detail satu proker berdasarkan ID",
      tags: ["Proker"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Success" },
        404: { description: "Not Found" },
      },
    },
    put: {
      summary: "Memperbarui data program kerja",
      tags: ["Proker"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                status: { $ref: "#/components/schemas/ProkerStatus" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Updated" },
      },
    },
    delete: {
      summary: "Menghapus program kerja",
      tags: ["Proker"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Deleted" },
      },
    },
  },
};
