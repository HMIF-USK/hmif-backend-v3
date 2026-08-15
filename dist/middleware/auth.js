"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireDepartement = exports.requireRole = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const verifyToken = (req, res, next) => {
    try {
        // Ambil token dari Authorization header format: "Bearer <token>"
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        if (!token) {
            res.status(401).json({
                status: 401,
                message: "Access denied. No token provided.",
            });
            return;
        }
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Simpan payload ke dalam req.user
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({
                status: 401,
                message: "Token has expired.",
            });
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(403).json({
                status: 403,
                message: "Invalid token.",
            });
        }
        else {
            console.error("JWT verification error:", error);
            res.status(500).json({
                status: 500,
                message: "Token verification failed.",
            });
        }
    }
};
exports.verifyToken = verifyToken;
// Batasi akses ke role tertentu. Dipakai setelah verifyToken.
const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ status: 401, message: "Unauthorized. User not authenticated." });
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                status: 403,
                message: "Forbidden. Role kamu tidak punya akses ke resource ini.",
            });
            return;
        }
        next();
    };
};
exports.requireRole = requireRole;
/**
 * Batasi akses ke akun departemen tertentu (mis. PPM untuk Informatic Club).
 * Role enum tidak memuat nama departemen, jadi pemiliknya dicek lewat tabel departement.
 * superUser selalu lolos. Dipakai setelah verifyToken.
 */
const requireDepartement = (name) => {
    return async (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ status: 401, message: "Unauthorized. User not authenticated." });
            return;
        }
        if (req.user.role === "superUser") {
            next();
            return;
        }
        const owned = await prisma_1.default.departement.findFirst({
            where: { user_id: req.user.id, name },
        });
        if (!owned) {
            res.status(403).json({
                status: 403,
                message: `Forbidden. Hanya departemen ${name} yang punya akses ke resource ini.`,
            });
            return;
        }
        next();
    };
};
exports.requireDepartement = requireDepartement;
