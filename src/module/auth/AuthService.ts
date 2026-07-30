import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PickLogin, PickRegister } from "./auth.types";
import { Response, Request } from "express";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

class AuthService {
  public async login(payload: PickLogin, res: Response) {
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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "username dan password",
        status: 400,
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

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

  public async profile(user: { id?: string; username?: string } | undefined, res: Response) {
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

  public async registerDeveloper(payload: PickRegister, res: Response) {
    try {
      const { password, role, username } = payload;

      if (!payload) {
        return res.status(404).json({
          message: "body not found",
          status: 404,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

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
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "server internal error",
        error: error,
      });
    }
  }
}

export default new AuthService();
