export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: TUser;
  token: string;
}

export type TUser = Omit<IUser, "password">;
export type TRegisterUser = Omit<IRegisterUser, "password">;
export type TLoginUser = Omit<ILoginUser, "password">;
export type TAuthResponse = Omit<IAuthResponse, "user">;
