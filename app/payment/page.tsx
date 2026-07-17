"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

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

  async function submitPayment() {
    if (!transactionId) {
      alert("Please enter Transaction ID.");
      return;
    }

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
    }
  }

  return (
    <main className="min-h-screen bg-black flex justify-center items-center p-6">
      <div className="bg-[#151515] border border-orange-500 rounded-xl p-8 w-full max-w-lg text-white">

        <h1 className="text-3xl text-center text-orange-500 font-bold mb-6">
          💳 Payment
        </h1>

        <div className="space-y-2 mb-6">
          <p><b>Tournament:</b> 4DG TOURNAMENT</p>
          <p><b>Date:</b> {date}</p>
          <p><b>Time:</b> {time}</p>
          <p><b>Slot:</b> {slot}</p>
          <p><b>Entry Fee:</b> ₹27</p>
        </div>

        <div className="flex justify-center mb-4">
          <img
            src="/qr.png"
            alt="QR Code"
            className="w-60 h-60 rounded-lg border border-orange-500"
          />
        </div>

        <div className="bg-green-900 p-4 rounded-lg mb-6 text-center">
          <p className="font-bold text-green-400">
            📲 After payment, send your payment screenshot to:
          </p>

          <p className="text-xl font-bold text-white">
            WhatsApp: 8422026534
          </p>

          <p className="text-sm mt-2">
            Also send your Team Name and Transaction ID.
          </p>
        </div>

        <input
          type="text"
          placeholder="Enter Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="w-full p-3 rounded bg-[#222] mb-6"
        />

        <button
          onClick={submitPayment}
          className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 rounded-lg"
        >
          ✅ Submit Payment
        </button>

      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}