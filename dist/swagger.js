"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const proker_docs_1 = require("./docs/proker.docs");
const options = {
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
                    example: "ComingSoon",
                },
                Proker: {
                    type: "object",
                    properties: {
                        id: { type: "string", format: "uuid" },
                        departement_id: { type: "string", format: "uuid" },
                        name: { type: "string", example: "Upgrading HMIF 2026" },
                        description: {
                            type: "string",
                            example: "Meningkatkan solidaritas",
                        },
                        status: { $ref: "#/components/schemas/ProkerStatus" },
                        event_start: { type: "string", format: "date-time" },
                        event_end: { type: "string", format: "date-time" },
                        location: { type: "string", example: "Aula FMIPA" },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" },
                    },
                },
            },
        },
        // Definisikan endpoint dan operasi API di sini ygy
        paths: {
            ...proker_docs_1.prokerPaths,
        },
    },
    apis: [
        "./src/app.ts",
        "./src/routes/*.ts",
        "./src/controllers/*.ts",
        "./src/module/proker/ProkerController.ts",
    ],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
