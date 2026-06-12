"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
class AuthService {
    async login(payload, res) {
        const { username, password } = payload;
        const user = await prisma.user.findFirst({
            where: { username },
        });
        if (!user) {
            return res.status(400).json({
                message: "user not found",
                status: 400,
            });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "username dan password",
                status: 400,
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, JWT_SECRET, {
            expiresIn: "1d",
        });
        return {
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
            },
        };
    }
    async registerDeveloper(payload, res) {
        try {
            const { password, role, username } = payload;
            if (!payload) {
                return res.status(404).json({
                    message: "body not found",
                    status: 404,
                });
            }
            const query = await prisma.user.create({
                data: {
                    password: password,
                    role: role,
                    username: username,
                },
            });
            if (!query) {
                return res.status(400).json({
                    status: 400,
                    message: "query bad request",
                });
            }
            return query;
        }
        catch (error) {
            res.status(500).json({
                status: 500,
                message: "server internal error",
                error: error,
            });
        }
    }
}
exports.default = new AuthService();
