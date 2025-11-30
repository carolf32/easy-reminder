"use client";

import api from "@/lib/axios";
import React, { useState } from "react";

export default function SOSButton() {
  const [loading, setLoading] = useState(false);

  const handleSOSClick = async () => {
    if (!confirm("⚠️ Do you really want to send an SOS alert?")) {
      return;
    }

    setLoading(true);

    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          try {
            await api.post("/sos/trigger", location);
            alert(
              "✅ Emergency alert sent successfully! Your emergency contact has been notified."
            );
          } catch (error: any) {
            console.error("Error sending emergency alert:", error);
            alert(
              `❌ Error sending emergency alert: ${
                error.response?.data?.message || error.message
              }`
            );
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "❌ It was not possible to get your location. Please enable location services."
          );
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error sending emergency alert");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSOSClick}
      disabled={loading}
      className={`btn btn-danger flex items-center gap-2 whitespace-nowrap ${
        loading
          ? "opacity-50 cursor-not-allowed"
          : "hover:scale-105 hover:shadow-xl transition-all"
      }`}
      title="Send emergency alert"
    >
      <span className="text-2xl animate-pulse">🚨</span>
      <span className="text-lg">{loading ? "Sending..." : "SOS"}</span>
    </button>
  );
}
