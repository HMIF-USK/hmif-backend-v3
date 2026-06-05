import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Boilerpad API",
      version: "1.0.0",
      description: "Express TypeScript API documentation generated with Swagger.",
    },
    servers: [
      {
        url: "http://localhost:5000", 
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            status: { type: "integer", example: 400 },
            message: { type: "string", example: "Bad request" },
            error: { type: ["string", "object"], nullable: true },
          },
        },
        ApiResponse: {
          type: "object",
          properties: {
            status: { type: "integer" },
            message: { type: "string" },
            data: { type: "object" },
          },
        },
        ProkerStatus: {
          type: "string",
          enum: ["ComingSoon", "OnGoing", "Completed"],
          example: "ComingSoon"
        },
        Proker: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            departement_id: { type: "string", format: "uuid" },
            name: { type: "string", example: "Upgrading HMIF 2026" },
            description: { type: "string", example: "Meningkatkan solidaritas" },
            status: { $ref: "#/components/schemas/ProkerStatus" },
            event_start: { type: "string", format: "date-time" },
            event_end: { type: "string", format: "date-time" },
            location: { type: "string", example: "Aula FMIPA" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" }
          }
        }
      },
    },
    // Definisikan endpoint dan operasi API di sini ygy
    paths: {
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
                      data: { type: "array", items: { $ref: "#/components/schemas/Proker" } }
                    }
                  }
                }
              }
            }
          }
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
                  required: ["name", "departement_id", "event_start", "event_end"],
                  properties: {
                    name: { type: "string", example: "Makrab Informatika" },
                    departement_id: { type: "string", example: "uuid-dept-kamu" },
                    description: { type: "string", example: "Acara keakraban" },
                    event_start: { type: "string", format: "date-time", example: "2026-06-05T12:00:00Z" },
                    event_end: { type: "string", format: "date-time", example: "2026-06-06T12:00:00Z" },
                    location: { type: "string", example: "Lampuuk" },
                    status: { $ref: "#/components/schemas/ProkerStatus" },
                    photos: { type: "array", items: { type: "string" }, example: ["https://linkfoto.com/1.png"] }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: "Created" }
          }
        }
      },
      "/api/prokers/{id}": {
        get: {
          summary: "Mengambil detail satu proker berdasarkan ID",
          tags: ["Proker"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } }
          ],
          responses: {
            200: { description: "Success" },
            404: { description: "Not Found" }
          }
        },
        put: {
          summary: "Memperbarui data program kerja",
          tags: ["Proker"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    status: { $ref: "#/components/schemas/ProkerStatus" }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: "Updated" }
          }
        },
        delete: {
          summary: "Menghapus program kerja",
          tags: ["Proker"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } }
          ],
          responses: {
            200: { description: "Deleted" }
          }
        }
      }
    }
  },
  apis: [
    "./src/app.ts",
    "./src/routes/*.ts",
    "./src/controllers/*.ts",
    "./src/module/proker/ProkerController.ts" // <- Membaca semua file .ts di dalam subfolder module
  ], 
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;