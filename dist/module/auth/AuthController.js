"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("./AuthService"));
class AuthController {
    login = async (req, res) => {
        try {
            const response = await AuthService_1.default.login(req.body, res);
            if (!response) {
                res.status(400).json({
                    message: "service not found",
                    status: 400,
                });
                return;
            }
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json({
                message: "server intenal error",
                status: 500,
                error: error,
            });
            return;
        }
    };
    register = async (req, res) => {
        try {
            const payload = req.body;
            const service = await AuthService_1.default.registerDeveloper(payload, res);
            if (!service) {
                res.status(400).json({
                    status: 400,
                    message: "service not respone",
                });
                return;
            }
            res.status(201).json({
                message: "successful create users",
                data: service,
                status: 201,
            });
        }
        catch (error) {
            res.status(500).json({
                nessage: "server internal error",
                status: 500,
                error: error,
            });
            return;
        }
    };
}
exports.default = new AuthController();
