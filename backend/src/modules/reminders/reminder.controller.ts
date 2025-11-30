import { container, inject, injectable } from "tsyringe";
import { ReminderService } from "./reminder.service";
import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { ApiError } from "../utils/ApiError";
import { createReminderSchema } from "./reminder.schema";
import { ZodError } from "zod";

@injectable()
export class ReminderController {
  constructor(
    @inject(ReminderService) private readonly service: ReminderService
  ) {}

  createReminder = async (req: AuthRequest, res: Response) => {
    try {
      const validatedData = createReminderSchema.parse(req.body);
      const reminder = await this.service.createReminder(
        validatedData,
        req.user?.id as number
      );
      return res.status(201).json(reminder);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Invalid request body",
          errors: error.message,
        });
      }
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  getReminders = async (req: AuthRequest, res: Response) => {
    try {
      const reminders = await this.service.getReminders(req.user?.id as number);
      return res.status(200).json(reminders);
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  getReminderById = async (req: AuthRequest, res: Response) => {
    try {
      const reminder = await this.service.getReminderById(
        req.params.id,
        req.user?.id as number
      );
      return res.status(200).json(reminder);
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  deleteReminder = async (req: AuthRequest, res: Response) => {
    try {
      await this.service.deleteReminder(req.params.id, req.user?.id as number);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
