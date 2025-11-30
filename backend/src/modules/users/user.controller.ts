import { inject, injectable } from "tsyringe";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

@injectable()
export class UserController {
  constructor(@inject(UserService) private readonly service: UserService) {}

  login = async (req: Request, res: Response) => {
    try {
      const user = await this.service.login(req.body);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const user = await this.service.register(req.body);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
