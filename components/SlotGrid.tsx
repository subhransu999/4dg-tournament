"use client";

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
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
      {Array.from({ length: 18 }).map((_, index) => {
        const slot = index + 1;

        const booking = bookings.find(
          (b) =>
            b.slot === slot &&
            b.time === selectedTime &&
            b.status !== "rejected"
        );

        let color = "bg-green-500 hover:bg-green-600 text-black";
        let disabled = false;

        if (booking?.status === "pending") {
          color = "bg-yellow-500 text-black";
          disabled = true;
        }

        if (booking?.status === "approved") {
          color = "bg-red-500 text-white";
          disabled = true;
        }

        if (!booking && selectedSlot === slot) {
          color = "bg-blue-500 text-white";
        }

        return (
          <button
            key={slot}
            disabled={disabled}
            onClick={() => setSelectedSlot(slot)}
            className={`font-bold rounded-xl py-5 transition ${color}`}
          >
            Slot {slot}
          </button>
        );
      })}
    </div>
  );
}