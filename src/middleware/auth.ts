import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { JwtPayload } from "../types/index";
import { userrRole } from "@prisma/client";
import prisma from "../lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Extend Request interface untuk menambahkan user property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
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
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Simpan payload ke dalam req.user
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        status: 401,
        message: "Token has expired.",
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({
        status: 403,
        message: "Invalid token.",
      });
    } else {
      console.error("JWT verification error:", error);
      res.status(500).json({
        status: 500,
        message: "Token verification failed.",
      });
    }
  }
};

// Batasi akses ke role tertentu. Dipakai setelah verifyToken.
export const requireRole = (...allowedRoles: userrRole[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
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

/**
 * Batasi akses ke akun departemen tertentu (mis. PPM untuk Informatic Club).
 * Role enum tidak memuat nama departemen, jadi pemiliknya dicek lewat tabel departement.
 * superUser selalu lolos. Dipakai setelah verifyToken.
 */
export const requireDepartement = (name: string): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      res.status(401).json({ status: 401, message: "Unauthorized. User not authenticated." });
      return;
    }

    if (req.user.role === "superUser") {
      next();
      return;
    }

    const owned = await prisma.departement.findFirst({
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
