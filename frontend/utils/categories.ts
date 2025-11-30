import { ReminderCategory } from "@/types/reminder";

export const categoryIcons: Record<ReminderCategory, string> = {
  medication: "💊",
  event: "🎉",
  appointment: "📅",
  task: "✅",
  birthday: "🎂",
  payment: "💰",
};

export const categoryLabels: Record<ReminderCategory, string> = {
  medication: "Medication",
  event: "Event",
  appointment: "Appointment",
  task: "Task",
  birthday: "Birthday",
  payment: "Payment",
};

export const categoryColors: Record<ReminderCategory, string> = {
  medication: "bg-blue-100 text-blue-800",
  event: "bg-purple-100 text-purple-800",
  appointment: "bg-green-100 text-green-800",
  task: "bg-yellow-100 text-yellow-800",
  birthday: "bg-pink-100 text-pink-800",
  payment: "bg-red-100 text-red-800",
};
