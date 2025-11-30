import { injectable } from "tsyringe";
import { prisma } from "../../config/prisma";
import { ApiError } from "../utils/ApiError";
import { TCreateReminder, TReminder } from "./reminder.schema";

@injectable()
export class ReminderService {
  async createReminder(
    data: TCreateReminder,
    userId: number
  ): Promise<TReminder> {
    const reminder = await prisma.reminder.create({
      data: {
        title: data.title,
        time: new Date(data.time),
        description: data.description,
        userId: userId,
      },
    });
    return reminder;
  }

  async getReminders(userId: number): Promise<TReminder[]> {
    const reminders = await prisma.reminder.findMany({ where: { userId } });
    return reminders;
  }

  async getReminderById(id: string, userId: number): Promise<TReminder> {
    const reminder = await prisma.reminder.findUnique({
      where: { id, userId },
    });
    if (!reminder) {
      throw new ApiError(404, "Reminder not found");
    }
    return reminder;
  }

  async deleteReminder(id: string, userId: number): Promise<void> {
    await prisma.reminder.delete({ where: { id, userId } });
  }
}
