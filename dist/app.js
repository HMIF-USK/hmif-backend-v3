"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = __importDefault(require("./routes"));
const swagger_1 = __importDefault(require("./swagger"));
class App {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)({ origin: "*", optionsSuccessStatus: 200 }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use("/api", routes_1.default);
        this.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
    }
    routes() {
        this.app.get("/", (req, res) => {
            res.json({
                message: "Hello World with TypeScript!",
                timestamp: new Date().toISOString(),
            });
        });
        // Controller yang memakai next(error) tanpa handler ini akan membalas HTML,
        // padahal frontend selalu mem-parse JSON.
        this.app.use((error, req, res, next) => {
            console.error("Unhandled error:", error);
            res.status(error?.status || 500).json({
                status: error?.status || 500,
                message: error?.message || "Internal server error",
            });
        });
    }
}
exports.default = new App().app;
