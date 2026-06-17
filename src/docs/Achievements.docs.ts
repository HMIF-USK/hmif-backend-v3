export const achievementsPaths = {
  "/api/achievements": {
    get: {
      summary: "Mengambil semua data prestasi",
      description:
        "Mengembalikan seluruh daftar prestasi yang tersimpan, diurutkan dari yang terbaru (berdasarkan `created_at` descending).",
      tags: ["Achievements"],
      responses: {
        200: {
          description: "Berhasil mengambil data prestasi",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Achievements retrieved successfully",
                  },
                  data: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Achievement" },
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Terjadi kesalahan pada server / database",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },

  "/api/achievements/latest": {
    get: {
      summary: "Mengambil prestasi terbaru dengan limit opsional",
      description:
        "Mengembalikan daftar prestasi terbaru diurutkan berdasarkan `achievement_date` descending. Jika `limit` tidak diberikan, default-nya adalah **10**. Nilai `limit` harus berupa angka antara **1–100**.",
      tags: ["Achievements"],
      parameters: [
        {
          name: "limit",
          in: "query",
          required: false,
          description: "Jumlah maksimal data yang dikembalikan (1–100, default: 10)",
          schema: {
            type: "integer",
            minimum: 1,
            maximum: 100,
            example: 5,
          },
        },
      ],
      responses: {
        200: {
          description: "Berhasil mengambil data prestasi terbaru",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Latest achievements retrieved successfully",
                  },
                  data: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Achievement" },
                  },
                },
              },
            },
          },
        },
        400: {
          description:
            "Parameter `limit` tidak valid (bukan angka, ≤ 0, atau > 100)",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                notANumber: {
                  summary: "limit bukan angka",
                  value: {
                    message: "Parameter 'limit' harus berupa angka yang valid",
                    error: "Nilai yang diterima: 'abc'",
                  },
                },
                tooSmall: {
                  summary: "limit ≤ 0",
                  value: {
                    message: "Parameter 'limit' harus bernilai lebih dari 0",
                  },
                },
                tooLarge: {
                  summary: "limit > 100",
                  value: {
                    message: "Parameter 'limit' tidak boleh melebihi 100",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Terjadi kesalahan pada server / database",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },

  "/api/achievements/{id}": {
    get: {
      summary: "Mengambil detail prestasi berdasarkan ID",
      description:
        "Mengembalikan satu data prestasi beserta foto-fotonya berdasarkan UUID yang diberikan.",
      tags: ["Achievements"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "UUID dari achievement yang ingin diambil",
          schema: {
            type: "string",
            format: "uuid",
            example: "d3e4f5a6-b7c8-9012-def0-123456789abc",
          },
        },
      ],
      responses: {
        200: {
          description: "Berhasil mengambil data prestasi",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Achievement retrieved successfully",
                  },
                  data: { $ref: "#/components/schemas/Achievement" },
                },
              },
            },
          },
        },
        400: {
          description: "ID kosong atau bukan format UUID yang valid",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                emptyId: {
                  summary: "ID kosong",
                  value: {
                    message: "Parameter 'id' tidak boleh kosong",
                  },
                },
                invalidUuid: {
                  summary: "ID bukan UUID valid",
                  value: {
                    message:
                      "Parameter 'id' harus berupa UUID yang valid (contoh: d3e4f5a6-b7c8-9012-def0-123456789abc)",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Data prestasi dengan ID tersebut tidak ditemukan",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: {
                message: "Achievement not found",
              },
            },
          },
        },
        500: {
          description: "Terjadi kesalahan pada server / database",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
};

export const achievementsSchemas = {
  FotoAchievement: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      },
      url: {
        type: "string",
        format: "uri",
        example: "https://storage.example.com/achievements/foto1.png",
      },
    },
  },
  Achievement: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "d3e4f5a6-b7c8-9012-def0-123456789abc",
      },
      title: {
        type: "string",
        example: "Juara 1 Gemastik XV Kategori Pengembangan Perangkat Lunak",
      },
      location: {
        type: "string",
        example: "Institut Teknologi Sepuluh Nopember, Surabaya",
      },
      description: {
        type: "string",
        example: "Tim HMIF USK berhasil meraih juara pertama pada ajang bergengsi tingkat nasional.",
      },
      achiever_name: {
        type: "string",
        example: "Tim Informatics USK",
      },
      achievement_date: {
        type: "string",
        format: "date-time",
        example: "2025-11-10T00:00:00.000Z",
      },
      created_by_user_id: {
        type: "string",
        format: "uuid",
        example: "f0e1d2c3-b4a5-6789-fedc-ba9876543210",
      },
      created_at: {
        type: "string",
        format: "date-time",
        example: "2025-11-11T08:30:00.000Z",
      },
      fotoAchievements: {
        type: "array",
        items: { $ref: "#/components/schemas/FotoAchievement" },
      },
    },
  },
};
