import { Deserializer } from "v8";

export const departmentPaths = {
  "/api/departments/{id}": {
    get: {
      summary: "Mengambil data department berdasarkan ID",
      tags: ["Department"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Success get department",
        },
        404: {
          description: "Department not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },

    put: {
      summary: "Memperbarui data department",
      tags: ["Department"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "Departemen PPM",
                },
                description: {
                  type: "string",
                  example: "Departemen Pengembangan dan Penelitian Mahasiswa",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Success update department",
        },
        400: {
          description: "Bad Request / Data yang dikirim tidak valid"
        },
        404: {
          description: "Department not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
};