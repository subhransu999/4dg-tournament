"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { db } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";

function PaymentContent() {
  const searchParams = useSearchParams();

  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const slot = searchParams.get("slot");
  const teamName = searchParams.get("teamName");
  const whatsapp = searchParams.get("whatsapp");

  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitPayment() {
    if (!transactionId.trim()) {
      alert("Please enter Transaction ID.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "bookings"), {
        teamName,
        whatsapp,
        date,
        time,
        slot: Number(slot),
        transactionId,
        status: "pending",
        createdAt: new Date(),
      });

      alert("Payment submitted successfully!");
      window.location.href = "/thankyou";
    } catch (error) {
      console.error(error);
      alert("Payment submission failed.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#0f0f0f] to-black flex items-center justify-center p-5 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl rounded-3xl border border-orange-500/40 bg-[#151515]/90 backdrop-blur-md shadow-2xl shadow-orange-500/20 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-400 p-6">
          <h1 className="text-3xl font-extrabold text-center text-black">
            💳 Payment
          </h1>

          <p className="text-center text-black/80 mt-2">
            Complete your booking
          </p>
        </div>

        <div className="p-6 md:p-8">
          {/* Tournament Details */}
          <div className="rounded-2xl bg-[#1b1b1b] border border-orange-500/30 p-5 mb-6 space-y-3">
            <h2 className="text-xl font-bold text-orange-400">
              Booking Summary
            </h2>

            <div className="flex justify-between">
              <span className="text-gray-400">Tournament</span>
              <span>4DG TOURNAMENT</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Date</span>
              <span>{date}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Match Time</span>
              <span>{time}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Slot</span>
              <span className="text-green-400 font-bold">
                Slot {slot}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Entry Fee</span>
              <span className="text-orange-400 font-bold">₹27</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="/qr.png"
              alt="QR Code"
              className="w-64 h-64 rounded-2xl border-2 border-orange-500 shadow-xl shadow-orange-500/20"
            />
          </div>

          {/* WhatsApp Box */}
          <div className="bg-green-900/30 border border-green-500 rounded-2xl p-5 mb-6 text-center">
            <h3 className="text-green-400 font-bold text-lg">
              📲 Send Payment Screenshot
            </h3>

            <p className="mt-2">
              After payment, send your screenshot along with your
            </p>

            <p className="font-bold mt-2">
              Team Name + Transaction ID
            </p>

            <p className="text-2xl font-extrabold text-white mt-3">
              WhatsApp
            </p>

            <p className="text-green-400 text-xl font-bold">
              8422026534
            </p>
          </div>

          {/* Transaction ID */}
          <label className="block mb-2 text-orange-300 font-semibold">
            Transaction ID
          </label>

          <input
            type="text"
            placeholder="Enter Transaction ID"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="w-full rounded-xl border border-orange-500/40 bg-[#1a1a1a] p-4 mb-8 text-white placeholder:text-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          />

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            onClick={submitPayment}
            className="w-full rounded-xl bg-orange-500 py-4 text-lg font-bold text-black shadow-lg shadow-orange-500/40 hover:bg-orange-400 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "✅ Submit Payment"}
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
          Loading...
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}