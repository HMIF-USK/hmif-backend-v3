import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Boilerpad API",
      version: "1.0.0",
      description:
        "Express TypeScript API documentation generated with Swagger.",
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
      },
    },
    paths: {
      // spread doc
    },
  },
  apis: ["./src/app.ts", "./src/routes/*.ts", "./src/controllers/*.ts"],
  tags: [{ name: "Auth", description: "Authentication endpoints" }],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
