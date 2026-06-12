import { userrRole } from "@prisma/client";

export interface IAuth {
  id: any;
  username: string;
  password: string;
  role: userrRole;
  token?: string;
  created_at: Date;
}

export type JwtPayload = Pick<IAuth, "id" | "username">;
export type PickRegister = Pick<IAuth, "username" | "password" | "role">;
export type PickLogin = Pick<IAuth, "username" | "password">;
export type PickLogout = Pick<IAuth, "id">;
