import { z } from "zod";

export const createReminderSchema = z.object({
  title: z.string().min(3),
  time: z.union([z.string().datetime(), z.date()]),
  description: z.string().optional().nullable(),
});

export const reminderSchema = createReminderSchema.extend({
  id: z.string(),
  userId: z.number(),
});

export type TReminder = z.infer<typeof reminderSchema>;
export type TCreateReminder = z.infer<typeof createReminderSchema>;
