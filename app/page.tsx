"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
    <main className="min-h-screen bg-gradient-to-b from-black via-[#111111] to-black text-white">

      {/* Navbar */}

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-orange-500"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-4">

          <h1 className="text-xl md:text-3xl font-bold text-orange-500">
            🏆 4DG TOURNAMENT
          </h1>

          <Link href="/admin/login">
            <button className="bg-orange-500 hover:bg-orange-600 hover:scale-105 transition-all duration-300 px-4 md:px-6 py-2 rounded-xl font-bold text-black shadow-lg">
              ADMIN LOGIN
            </button>
          </Link>

        </div>
      </motion.nav>

      {/* Banner */}

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="overflow-hidden"
      >
        <Image
          src="/banner.png"
          alt="Tournament Banner"
          width={1600}
          height={700}
          className="w-full h-[220px] sm:h-[350px] md:h-[500px] lg:h-[650px] object-cover transition-transform duration-700 hover:scale-105"
        />
      </motion.div>

      {/* Info Cards */}

      <section className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5 p-5 md:p-8">

        {[
          {
            title: "🏆 Prize Pool",
            value: "₹400",
          },
          {
            title: "🎫 Entry Fee",
            value: "₹27",
          },
          {
            title: "👥 Team Size",
            value: "18 Teams",
          },
          {
            title: "🎮 Game",
            value: "BGMI",
          },
        ].map((item, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
            }}
            whileHover={{
              scale: 1.05,
            }}
            className="bg-[#151515] border border-orange-500 rounded-2xl p-6 text-center shadow-lg hover:shadow-orange-500/30 transition-all"
          >
            <h2 className="text-gray-300 text-base md:text-lg">
              {item.title}
            </h2>

            <p className="text-orange-500 text-2xl md:text-4xl font-bold mt-3">
              {item.value}
            </p>

          </motion.div>

        ))}

      </section>

      {/* Match Time */}

      <section className="max-w-7xl mx-auto px-5 pb-10">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold text-orange-500 text-center mb-8"
        >
          ⏰ Select Match Time
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {["7:34 PM", "9:44 PM", "11:44 PM"].map((time) => (

            <motion.button
              key={time}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTime(time)}
              className={`py-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${
                selectedTime === time
                  ? "bg-green-500 text-black"
                  : "bg-orange-500 hover:bg-orange-600 text-black"
              }`}
            >
              🕘 {time}
            </motion.button>

          ))}

        </div>

      </section>

      {/* Slot Selection */}

      <section className="max-w-7xl mx-auto px-5 pb-10">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold text-orange-500 text-center mb-8"
        >
          🎫 Select Your Slot
        </motion.h2>

        <SlotGrid
          bookings={bookings}
          selectedTime={selectedTime}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />

      </section>

      {/* Book Button */}

      <section className="py-12 flex justify-center">

        <motion.button
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => {

            if (!selectedTime) {
              alert("Please select a match time.");
              return;
            }

            if (!selectedSlot) {
              alert("Please select a slot.");
              return;
            }

            const bookingDate = new Date().toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

window.location.href =
  `/booking?date=${encodeURIComponent(
    bookingDate
  )}&time=${encodeURIComponent(
    selectedTime
  )}&slot=${selectedSlot}`;

          }}
          className="bg-orange-500 hover:bg-orange-600 text-black font-bold text-lg md:text-2xl px-10 py-5 rounded-2xl shadow-xl"
        >
          🚀 BOOK SLOT NOW
        </motion.button>

      </section>

    </main>
  );
}