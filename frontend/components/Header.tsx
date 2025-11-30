import React from "react";
import FontSizeSwitcher from "./FontSizeSwitcher";
import SOSButton from "./SOSButton";

const Header = () => {
  return (
    <header className="bg-white rounded-2xl shadow-lg p-6 mb-8 slide-up">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 ">
              Easy Reminder
            </h1>
            <p className="text-sm text-gray-600">
              Your reminders always organized
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center flex-wrap">
          <FontSizeSwitcher />
          <SOSButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
