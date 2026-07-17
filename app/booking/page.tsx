"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

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

    window.location.href =
      `/payment?date=${date}&time=${time}&slot=${slot}&teamName=${encodeURIComponent(
        teamName
      )}&whatsapp=${encodeURIComponent(
        whatsapp
      )}&bookingDate=${encodeURIComponent(bookingDate)}`;
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="w-full max-w-lg bg-[#151515] border border-orange-500 rounded-xl p-8">
        <h1 className="text-3xl font-bold text-orange-500 text-center mb-6">
          🏆 4DG TOURNAMENT
        </h1>

        <div className="space-y-3 mb-6">
          <p>
            <strong>Tournament:</strong> 4DG TOURNAMENT
          </p>
          <p>
            <strong>Booking Date:</strong> {bookingDate}
          </p>
          <p>
            <strong>Match Time:</strong> {time}
          </p>
          <p>
            <strong>Selected Slot:</strong> Slot {slot}
          </p>
        </div>

        <input
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full p-3 rounded mb-4 text-white bg-[#1a1a1a]"
        />

        <input
          placeholder="WhatsApp Number"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full p-3 rounded mb-4 text-white bg-[#1a1a1a]"
        />

        <button
          onClick={saveBooking}
          className="w-full bg-orange-500 text-black font-bold py-3 rounded-lg"
        >
          Continue to Payment
        </button>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}