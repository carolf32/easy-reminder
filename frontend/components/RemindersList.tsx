import { IReminderWithCategory } from "@/types/reminder";
import {
  categoryColors,
  categoryIcons,
  categoryLabels,
} from "@/utils/categories";
import api from "@/lib/axios";

interface RemindersListProps {
  reminders: IReminderWithCategory[];
  setReminders: (reminders: IReminderWithCategory[]) => void;
}

const RemindersList = ({ reminders, setReminders }: RemindersListProps) => {
  const handleDeleteReminder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reminder?")) {
      return;
    }

    try {
      await api.delete(`/reminders/${id}`);
      setReminders(reminders.filter((reminder) => reminder.id !== id));
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert(
        `Error deleting reminder: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat("pt-PT", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(dateObj);
  };

  const isUpcoming = (date: Date | string) => {
    const reminderDate = date instanceof Date ? date : new Date(date);
    const now = new Date();
    const hoursDiff =
      (reminderDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursDiff > 0 && hoursDiff <= 24;
  };

  const isPast = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj < new Date();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {reminders.map((reminder) => (
        <div
          key={reminder.id}
          className={`bg-white border-2 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 card ${
            isUpcoming(reminder.time)
              ? "border-yellow-400 bg-yellow-50"
              : isPast(reminder.time)
              ? "border-gray-300 opacity-75"
              : "border-blue-200"
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-4xl">
                {categoryIcons[reminder.category || "medication"]}
              </div>
              <div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    categoryColors[reminder.category || "medication"]
                  }`}
                >
                  {categoryLabels[reminder.category || "medication"]}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleDeleteReminder(reminder.id)}
              className="btn text-gray-400 hover:text-red-600 transition-colors"
              title="Delete reminder"
            >
              ✖
            </button>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {reminder.title}
          </h3>

          {reminder.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {reminder.description}
            </p>
          )}

          <div className="flex items-center gap-2 text-sm">
            {isUpcoming(reminder.time) && (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                ⏰ To do!
              </span>
            )}
            {isPast(reminder.time) && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-semibold">
                ✓ Completed
              </span>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              📅
              <span className="font-medium">{formatDate(reminder.time)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RemindersList;
