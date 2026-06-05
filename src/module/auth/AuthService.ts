import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PickLogin } from "./auth.types";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

class AuthService {
  public async login(payload: PickLogin) {
    const { username, password } = payload;
    
    const user = await prisma.user.findFirst({
      where: { username }
    });

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid username or password");
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: "1d"
    });

    return {
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        departement_id: user.departement_id
      }
    };
  }
}

export default new AuthService();
