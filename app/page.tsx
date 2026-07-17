"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import SlotGrid from "@/components/SlotGrid";

export default function Home() {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "bookings"), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setBookings(data);
  });

  return () => unsubscribe();
}, []);
  return (
    <main className="min-h-screen bg-[#0b0b0b]">

      {/* Navbar */}
      <nav className="bg-black border-b border-orange-500">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

          <h1 className="text-3xl font-bold text-orange-500">
            🏆 4DG TOURNAMENT
          </h1>

          <Link href="/admin/login">
  <button className="bg-orange-500 px-5 py-2 rounded-lg font-bold text-black">
    ADMIN LOGIN
  </button>
</Link>

        </div>
      </nav>

      {/* Banner */}

      <div className="w-full mt-0">

        <Image
          src="/banner.png"
          alt="Tournament Banner"
          width={1400}
          height={700}
          className="w-full h-[550px] object-cover"
        />

      </div>
      {/* Info Cards */}

<section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 p-8">

  <div className="bg-[#151515] border border-orange-500 rounded-xl p-6 text-center">
    <h2 className="text-gray-300 text-lg">🏆 Prize Pool</h2>
    <p className="text-orange-500 text-3xl font-bold mt-2">₹400</p>
  </div>

  <div className="bg-[#151515] border border-orange-500 rounded-xl p-6 text-center">
    <h2 className="text-gray-300 text-lg">🎫 Entry Fee</h2>
    <p className="text-orange-500 text-3xl font-bold mt-2">₹27</p>
  </div>

  <div className="bg-[#151515] border border-orange-500 rounded-xl p-6 text-center">
    <h2 className="text-gray-300 text-lg">👥 Team Size</h2>
    <p className="text-orange-500 text-3xl font-bold mt-2">18 Teams</p>
  </div>

  <div className="bg-[#151515] border border-orange-500 rounded-xl p-6 text-center">
    <h2 className="text-gray-300 text-lg">🎮 Game</h2>
    <p className="text-orange-500 text-3xl font-bold mt-2">BGMI</p>
  </div>

 

</section>
{/* Match Time */}

<section className="max-w-7xl mx-auto p-8">

  <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">
    ⏰ Select Match Time
  </h2>

  <div className="flex flex-col md:flex-row gap-6 justify-center">

    <button
  onClick={() => setSelectedTime("9:44 PM")}
  className={`px-8 py-4 rounded-xl font-bold ${
    selectedTime === "9:44 PM"
      ? "bg-green-500 text-black"
      : "bg-orange-500 hover:bg-orange-600 text-black"
  }`}
>
  🕘 9:44 PM
</button>

    <button
  onClick={() => setSelectedTime("10:24 PM")}
  className={`px-8 py-4 rounded-xl font-bold ${
    selectedTime === "10:24 PM"
      ? "bg-green-500 text-black"
      : "bg-orange-500 hover:bg-orange-600 text-black"
  }`}
>
  🕥 10:24 PM
</button>

    <button
  onClick={() => setSelectedTime("11:04 PM")}
  className={`px-8 py-4 rounded-xl font-bold ${
    selectedTime === "11:04 PM"
      ? "bg-green-500 text-black"
      : "bg-orange-500 hover:bg-orange-600 text-black"
  }`}
>
  🕚 11:04 PM
</button>

  </div>

</section>
{/* Slot Selection */}

{/* Slot Selection */}

<section className="max-w-7xl mx-auto p-8">

  <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">
    🎫 Select Your Slot
  </h2>

  <SlotGrid
  bookings={bookings}
  selectedTime={selectedTime}
  selectedSlot={selectedSlot}
  setSelectedSlot={setSelectedSlot}
/>

</section>
{/* Book Slot */}

<section className="py-10 flex justify-center">

  <button
  onClick={() => {
    if (!selectedTime) {
      alert("Please select a match time.");
      return;
    }

    if (!selectedSlot) {
      alert("Please select a slot.");
      return;
    }

  window.location.href =
`/booking?time=${selectedTime}&slot=${selectedSlot}`;
  }}
  className="bg-orange-500 hover:bg-orange-600 text-black font-bold text-xl px-10 py-4 rounded-xl shadow-lg transition"
>
  🚀 BOOK SLOT NOW
</button>
</section>

    </main>
  );
} 