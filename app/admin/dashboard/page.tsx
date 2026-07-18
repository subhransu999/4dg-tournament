"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";

export default function DashboardPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  async function loadBookings() {
    const snapshot = await getDocs(collection(db, "bookings"));

    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setBookings(data);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function updateStatus(id: string, status: string) {
    try {
      await updateDoc(doc(db, "bookings", id), {
        status,
      });

      loadBookings();
    } catch (err) {
      console.error(err);
      alert("Failed to update booking.");
    }
  }

  async function clearAllBookings() {
    const ok = window.confirm(
      "Are you sure you want to delete ALL bookings?"
    );

    if (!ok) return;

    try {
      const snapshot = await getDocs(collection(db, "bookings"));

      for (const booking of snapshot.docs) {
        await deleteDoc(doc(db, "bookings", booking.id));
      }

      alert("All bookings deleted successfully.");

      loadBookings();
    } catch (err) {
      console.error(err);
      alert("Failed to delete bookings.");
    }
  }

  const filteredBookings = bookings.filter((booking) =>
    (booking.teamName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (b) => b.status === "pending"
  ).length;

  const approvedBookings = bookings.filter(
    (b) => b.status === "approved"
  ).length;

  const rejectedBookings = bookings.filter(
    (b) => b.status === "rejected"
  ).length;

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-orange-500 mb-8">
        👨‍💼 Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-blue-600 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold">📋 Total</h2>
          <p className="text-4xl font-bold mt-2">
            {totalBookings}
          </p>
        </div>

        <div className="bg-yellow-500 rounded-xl p-6 text-center text-black">
          <h2 className="text-xl font-bold">🟡 Pending</h2>
          <p className="text-4xl font-bold mt-2">
            {pendingBookings}
          </p>
        </div>

        <div className="bg-green-600 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold">✅ Approved</h2>
          <p className="text-4xl font-bold mt-2">
            {approvedBookings}
          </p>
        </div>

        <div className="bg-red-600 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold">❌ Rejected</h2>
          <p className="text-4xl font-bold mt-2">
            {rejectedBookings}
          </p>
        </div>

      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="date"
          className="bg-[#1a1a1a] border border-orange-500 rounded-lg px-4 py-2 text-white"
        />

        <button
          onClick={clearAllBookings}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
        >
          🗑️ Clear Bookings
        </button>
      </div>

      <input
        type="text"
        placeholder="🔍 Search Team Name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-lg bg-[#1a1a1a] border border-orange-500 text-white"
      />

      <table className="w-full border border-orange-500">
        <thead className="bg-orange-500 text-black">
          <tr>
            <th className="p-3">Team</th>
            <th className="p-3">WhatsApp</th>
            <th className="p-3">⏰ Time</th>
            <th className="p-3">🎫 Slot</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredBookings.map((booking) => (
            <tr
              key={booking.id}
              className="border-t border-orange-500"
            >
              <td className="p-3">{booking.teamName}</td>

              <td className="p-3">
                {booking.whatsapp}
              </td>

              <td className="p-3">
                {booking.time}
              </td>

              <td className="p-3">
                {booking.slot}
              </td>

              <td className="p-3">
                {booking.status === "pending" && (
                  <span className="text-yellow-400 font-bold">
                    🟡 Pending
                  </span>
                )}

                {booking.status === "approved" && (
                  <span className="text-green-400 font-bold">
                    ✅ Approved
                  </span>
                )}

                {booking.status === "rejected" && (
                  <span className="text-red-400 font-bold">
                    ❌ Rejected
                  </span>
                )}
              </td>

              <td className="p-3 flex gap-2">
                <button
                  onClick={() =>
                    updateStatus(booking.id, "approved")
                  }
                  className="bg-green-500 hover:bg-green-600 text-black px-3 py-1 rounded"
                >
                  ✅ Approve
                </button>

                <button
                  onClick={() =>
                    updateStatus(booking.id, "rejected")
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  ❌ Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}