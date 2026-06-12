"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../../module/auth/AuthController"));
class AuthRouter {
    authRouter;
    constructor() {
        this.authRouter = express_1.default.Router();
        this.routes();
    }
    routes() {
        this.authRouter.post("/login", AuthController_1.default.login);
        this.authRouter.post("/register", AuthController_1.default.register);
    }
}
exports.default = new AuthRouter().authRouter;
