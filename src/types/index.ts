import { IAuth } from "@/module/auth/auth.types";

export type JwtPayload = Pick<IAuth, "id" | "email" | "fullName" | "phone">;
