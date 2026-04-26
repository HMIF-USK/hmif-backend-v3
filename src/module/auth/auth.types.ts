export interface IAuth {
  id: any;
  email: string;
  fullName: string;
  phone: string;
  password: string;
  token: string;
  createdAt: Date;
  updateAt: Date;
}

export type JwtPayload = Pick<IAuth, "id" | "email" | "fullName" | "phone">;
export type PickRegister = Pick<
  IAuth,
  "email" | "fullName" | "phone" | "password"
>;
export type PickLogin = Pick<IAuth, "email" | "password">;
export type PickLogout = Pick<IAuth, "id">;
