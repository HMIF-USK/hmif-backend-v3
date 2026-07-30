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
                role: user.role,
            },
        };
    }
    async profile(user, res) {
        if (!user?.id) {
            return res.status(401).json({
                message: "Unauthorized",
                status: 401,
            });
        }
        const profile = await prisma.user.findUnique({
            where: { id: user.id },
            select: {
                id: true,
                username: true,
                role: true,
                created_at: true,
            },
        });
        if (!profile) {
            return res.status(404).json({
                message: "user not found",
                status: 404,
            });
        }
        return profile;
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
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const query = await prisma.user.create({
                data: {
                    password: hashedPassword,
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
