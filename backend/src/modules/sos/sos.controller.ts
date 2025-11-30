import { inject, injectable } from "tsyringe";
import { SOSService } from "./sos.service";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Response } from "express";
import { ApiError } from "../utils/ApiError";

@injectable()
export class SOSController {
  constructor(@inject(SOSService) private readonly service: SOSService) {}

  triggerSOS = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const location = req.body;
    try {
      const sos = await this.service.triggerSOS(userId, location);
      return res.status(200).json(sos);
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  getSOSHistory = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const history = await this.service.getSOSHistory(userId);
      return res.status(200).json(history);
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
