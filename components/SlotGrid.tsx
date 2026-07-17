"use client";

import { motion } from "framer-motion";

type Booking = {
  slot: number;
  time: string;
  status: "pending" | "approved" | "rejected";
};

interface Props {
  bookings: Booking[];
  selectedTime: string;
  selectedSlot: number | null;
  setSelectedSlot: (slot: number) => void;
}

export default function SlotGrid({
  bookings,
  selectedTime,
  selectedSlot,
  setSelectedSlot,
}: Props) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {Array.from({ length: 18 }).map((_, index) => {
        const slot = index + 1;

        const booking = bookings.find(
          (b) =>
            b.slot === slot &&
            b.time === selectedTime &&
            b.status !== "rejected"
        );

        let color =
          "bg-green-500 hover:bg-green-400 text-black shadow-green-500/40";

        let disabled = false;

        if (booking?.status === "pending") {
          color =
            "bg-yellow-500 text-black shadow-yellow-500/40 cursor-not-allowed";
          disabled = true;
        }

        if (booking?.status === "approved") {
          color =
            "bg-red-500 text-white shadow-red-500/40 cursor-not-allowed";
          disabled = true;
        }

        if (!booking && selectedSlot === slot) {
          color =
            "bg-blue-500 text-white shadow-blue-500/40";
        }

        return (
          <motion.button
            key={slot}
            whileHover={!disabled ? { scale: 1.08 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            disabled={disabled}
            onClick={() => setSelectedSlot(slot)}
            className={`
              rounded-2xl
              h-20
              font-bold
              text-lg
              transition-all
              duration-300
              shadow-lg
              ${color}
            `}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs opacity-80">TEAM</span>
              <span>#{slot}</span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}