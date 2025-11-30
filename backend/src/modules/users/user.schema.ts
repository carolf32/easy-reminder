import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  createdAt: z.date(),
  emergencyContactName: z.string().min(3).optional().nullable(),
  emergencyContactPhone: z.string().min(10).optional().nullable(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  emergencyContactName: z.string().min(3).optional(),
  emergencyContactPhone: z.string().min(10).optional(),
});

export const userBasicSchema = z.object({
  id: z.number(),
  name: z.string(),
  emergencyContactName: z.string().min(3).optional().nullable(),
  emergencyContactPhone: z.string().min(10).optional().nullable(),
});

export type TUserData = z.infer<typeof userSchema>;
export type TLoginData = z.infer<typeof loginSchema>;
export type TRegisterData = z.infer<typeof registerSchema>;
export type TUser = Omit<TUserData, "password">;
export type TAuthResponse = {
  user: TUser;
  token: string;
};
export type TUserBasic = z.infer<typeof userBasicSchema>;
