"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function BookingContent() {
  const searchParams = useSearchParams();

  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const slot = searchParams.get("slot");

  const bookingDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const [teamName, setTeamName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  function saveBooking() {
    if (!teamName || !whatsapp) {
      alert("Please fill all fields");
      return;
    }

    window.location.href = `/payment?date=${date}&time=${time}&slot=${slot}&teamName=${encodeURIComponent(
      teamName
    )}&whatsapp=${encodeURIComponent(
      whatsapp
    )}&bookingDate=${encodeURIComponent(bookingDate)}`;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#0f0f0f] to-black flex items-center justify-center p-5 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl rounded-3xl border border-orange-500/40 bg-[#151515]/90 backdrop-blur-md shadow-2xl shadow-orange-500/20 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-400 p-6">
          <h1 className="text-3xl font-extrabold text-center text-black">
            🏆 4DG TOURNAMENT
          </h1>
          <p className="text-center text-black/80 mt-2 font-medium">
            Complete your team registration
          </p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Match Details */}
          <div className="rounded-2xl border border-orange-500/30 bg-[#1b1b1b] p-5 mb-6 space-y-3">
            <h2 className="text-xl font-bold text-orange-400 mb-2">
              Match Details
            </h2>

            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">Tournament</span>
              <span className="font-semibold">4DG TOURNAMENT</span>
            </div>

            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">Booking Date</span>
              <span>{bookingDate}</span>
            </div>

            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">Match Time</span>
              <span>{time}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Selected Slot</span>
              <span className="text-green-400 font-bold">Slot {slot}</span>
            </div>
          </div>

          {/* Team Name */}
          <label className="block mb-2 font-semibold text-orange-300">
            Team Name
          </label>

          <input
            type="text"
            placeholder="Enter your team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full rounded-xl border border-orange-500/40 bg-[#1a1a1a] p-4 mb-5 text-white placeholder:text-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          />

          {/* WhatsApp */}
          <label className="block mb-2 font-semibold text-orange-300">
            WhatsApp Number
          </label>

          <input
            type="tel"
            placeholder="Enter your WhatsApp number"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full rounded-xl border border-orange-500/40 bg-[#1a1a1a] p-4 mb-8 text-white placeholder:text-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          />

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={saveBooking}
            className="w-full rounded-xl bg-orange-500 py-4 text-lg font-bold text-black shadow-lg shadow-orange-500/40 transition hover:bg-orange-400"
          >
            🚀 Continue to Payment
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
          Loading...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}