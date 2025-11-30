"use client";
import Header from "@/components/Header";
import RemindersList from "@/components/RemindersList";
import { useEffect, useState } from "react";
import { IReminderWithCategory } from "@/types/reminder";
import api from "@/lib/axios";
import RegisterReminderModal from "@/components/RegisterReminderModal";

export default function HomePage() {
  const [reminders, setReminders] = useState<IReminderWithCategory[]>([]);
  const [isRegisterReminderModalOpen, setIsRegisterReminderModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await api.get<IReminderWithCategory[]>("/reminders");
        setReminders(response.data);
      } catch (error) {
        console.error("Error fetching reminders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReminders();
  }, []);

  const handleOpenModal = () => {
    setIsRegisterReminderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Header />

        <main className="space-y-6">
          <div className="card slide-up">
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <h2 className="card-header">My Reminders</h2>
                <p className="text-gray-600">
                  Manage your reminders easily and practically
                </p>
              </div>
              <button
                onClick={handleOpenModal}
                className="btn-primary btn flex items-center gap-2 whitespace-nowrap"
              >
                <span className="text-xl">+</span>
                New Reminder
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
              </div>
            ) : reminders.length > 0 ? (
              <RemindersList
                reminders={reminders}
                setReminders={setReminders}
              />
            ) : (
              <div className="card text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No reminders registered
                </h3>
                <p className="text-gray-600 mb-6 ">
                  Start by creating your first reminder!
                </p>
                <button onClick={handleOpenModal} className="btn btn-primary">
                  Create First Reminder
                </button>
              </div>
            )}
          </div>
        </main>

        {isRegisterReminderModalOpen && (
          <RegisterReminderModal
            onClose={() => setIsRegisterReminderModalOpen(false)}
            onRegister={(newReminder: IReminderWithCategory) =>
              setReminders([...reminders, newReminder])
            }
          />
        )}
      </div>
    </div>
  );
}
