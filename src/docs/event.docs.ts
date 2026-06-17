export const eventPaths = {
  "/api/events": {
    get: {
      summary: "Mengambil semua data event",
      tags: ["Event"],
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Success get events" },
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
  },

  "/api/events/{id}": {
    get: {
      summary: "Mengambil detail satu event berdasarkan ID",
      tags: ["Event"],
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
        400: { description: "Event tidak ditemukan" },
      },
    },
  },
};