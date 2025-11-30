import {
  IReminder,
  IReminderWithCategory,
  ReminderCategory,
} from "@/types/reminder";
import { categoryIcons, categoryLabels } from "@/utils/categories";
import api from "@/lib/axios";
import { useState } from "react";

interface RegisterReminderModalProps {
  onClose: () => void;
  onRegister: (reminder: IReminder) => void;
}

const RegisterReminderModal = ({
  onClose,
  onRegister,
}: RegisterReminderModalProps) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ReminderCategory>("medication");

  const isFormValid = title.trim().length >= 3 && time.length > 0;

  const formatTimeForAPI = (timeString: string) => {
    if (!timeString) return timeString;

    // Converte para Date object e depois para ISO string
    const date = new Date(timeString);
    return date.toISOString();
  };

  const handleRegisterReminder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim().length < 3) {
      alert("The title must have at least 3 characters");
      return;
    }

    if (!time) {
      alert("Please select a date and time");
      return;
    }

    try {
      const formattedTime = formatTimeForAPI(time);

      const requestData = {
        title: title.trim(),
        time: formattedTime,
        description: description.trim() || null,
        category: category,
      };
      const response = await api.post<IReminder>("/reminders", requestData);

      const reminderWithCategory: IReminderWithCategory = {
        ...response.data,
        category: category,
      };
      onRegister(reminderWithCategory);
      onClose();
    } catch (error: any) {
      let errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Unknown error";

      if (
        error.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        const zodErrors = error.response.data.errors
          .map((err: any) => `${err.path.join(".")}: ${err.message}`)
          .join("\n");
        errorMessage += "\nDetails:\n" + zodErrors;
      }

      alert(`Error creating reminder: ${errorMessage}`);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-wide">New Reminder</h2>
              <p className="text-blue-100 text-sm mt-1">
                Fill in the details of your reminder
              </p>
            </div>
            <button
              onClick={onClose}
              className="btn text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
            >
              ✖
            </button>
          </div>
        </div>

        <form onSubmit={handleRegisterReminder} className="p-6 space-y-6">
          <div>
            <div>
              <label className="label">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {(
                  Object.entries(categoryIcons) as [ReminderCategory, string][]
                ).map(([cat, icon]) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`btn btn-secondary  flex flex-col items-center transition-all ${
                      category === cat
                        ? "border-blue-600 bg-blue-50 shadow-md scale-105"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <span className="text-3xl">{icon}</span>
                    <span className="text-xs font-semibold text-gray-700">
                      {categoryLabels[cat]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label" htmlFor="title">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Ex: Take medication..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
                required
                minLength={3}
              />
            </div>

            <div>
              <label className="label" htmlFor="time">
                Date and Time <span className="text-red-500">*</span>
              </label>
              <input
                id="time"
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="input"
                required
              />
            </div>

            <div>
              <label className="label" htmlFor="description">
                Description (optional)
              </label>
              <textarea
                id="description"
                placeholder="Add details about the reminder..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input resize-none"
                rows={4}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className="btn btn-primary flex-1"
            >
              Create Reminder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterReminderModal;
