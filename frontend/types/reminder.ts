export interface IReminder {
  id: string;
  title: string;
  time: Date;
  description?: string;
  userId: number;
}

export interface IReminderWithCategory extends IReminder {
  category?: ReminderCategory;
}

export type ReminderCategory =
  | "medication"
  | "event"
  | "appointment"
  | "task"
  | "birthday"
  | "payment";
