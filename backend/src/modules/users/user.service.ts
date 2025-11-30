import { injectable } from "tsyringe";
import { prisma } from "../../config/prisma";
import { ApiError } from "../utils/ApiError";
import { TAuthResponse, TLoginData, TRegisterData, TUser } from "./user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

@injectable()
export class UserService {
  async login(data: TLoginData): Promise<TAuthResponse> {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
    }

    if (!process.env.JWT_SECRET) {
      throw new ApiError(500, "JWT_SECRET not configured");
    }

    const { password, ...userWithoutPassword } = user;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return { user: userWithoutPassword, token };
  }

  async register(data: TRegisterData): Promise<TUser> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
