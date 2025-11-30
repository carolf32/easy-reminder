"use client";

import React, { useEffect, useState } from "react";

export default function FontSizeSwitcher() {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(0);
  const maxIncrease = 2;
  const maxDecrease = -2;

  const applyFontZoom = (multiplier: number) => {
    const root = document.documentElement;

    root.classList.remove(
      "font-zoom-decrease-2",
      "font-zoom-decrease-1",
      "font-zoom-normal",
      "font-zoom-increase-1",
      "font-zoom-increase-2"
    );

    if (multiplier === -2) root.classList.add("font-zoom-decrease-2");
    else if (multiplier === -1) root.classList.add("font-zoom-decrease-1");
    else if (multiplier === 0) root.classList.add("font-zoom-normal");
    else if (multiplier === 1) root.classList.add("font-zoom-increase-1");
    else if (multiplier === 2) root.classList.add("font-zoom-increase-2");
  };

  useEffect(() => {
    const savedMultiplier = localStorage.getItem("fontSizeMultiplier");
    if (savedMultiplier) {
      const multiplier = parseInt(savedMultiplier);
      setFontSizeMultiplier(multiplier);
      applyFontZoom(multiplier);
    }
  }, []);

  const increaseFontSize = () => {
    if (fontSizeMultiplier < maxIncrease) {
      const newMultiplier = fontSizeMultiplier + 1;
      setFontSizeMultiplier(newMultiplier);
      applyFontZoom(newMultiplier);
      localStorage.setItem("fontSizeMultiplier", newMultiplier.toString());
    }
  };

  const decreaseFontSize = () => {
    if (fontSizeMultiplier > maxDecrease) {
      const newMultiplier = fontSizeMultiplier - 1;
      setFontSizeMultiplier(newMultiplier);
      applyFontZoom(newMultiplier);
      localStorage.setItem("fontSizeMultiplier", newMultiplier.toString());
    }
  };

  const resetFontSize = () => {
    setFontSizeMultiplier(0);
    applyFontZoom(0);
    localStorage.removeItem("fontSizeMultiplier");
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={decreaseFontSize}
        disabled={fontSizeMultiplier === maxDecrease}
        className={`btn btn-secondary ${
          fontSizeMultiplier === maxDecrease
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        A-
      </button>

      <button
        onClick={resetFontSize}
        className={`btn ${
          fontSizeMultiplier === 0
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        A
      </button>

      <button
        onClick={increaseFontSize}
        disabled={fontSizeMultiplier === maxIncrease}
        className={`btn btn-secondary ${
          fontSizeMultiplier === maxIncrease
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        A+
      </button>
    </div>
  );
}
