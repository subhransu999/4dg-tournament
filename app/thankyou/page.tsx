"use client";

import { motion } from "framer-motion";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#0f0f0f] to-black flex items-center justify-center p-5 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl rounded-3xl border border-orange-500/40 bg-[#151515]/90 backdrop-blur-md shadow-2xl shadow-orange-500/20 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-400 p-8 text-center">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-6xl"
          >
            🎉
          </motion.div>

          <h1 className="text-4xl font-extrabold text-black mt-4">
            Booking Submitted
          </h1>

          <p className="text-black/80 mt-2 font-medium">
            Thank you for registering
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-orange-400">
              🏆 4DG TOURNAMENT
            </h2>

            <p className="text-gray-300 mt-4 leading-7">
              Your payment details have been submitted successfully.
              <br />
              Our admin will verify your payment shortly.
            </p>
          </div>

          {/* Status Card */}
          <div className="bg-yellow-500/20 border border-yellow-500 rounded-2xl p-5 mb-6 text-center">
            <h3 className="text-yellow-400 text-2xl font-bold">
              ⏳ Status: Pending Approval
            </h3>

            <p className="text-gray-300 mt-3">
              Once your payment is verified,
              <br />
              your slot will be confirmed.
            </p>
          </div>

          {/* WhatsApp Reminder */}
          <div className="bg-green-900/30 border border-green-500 rounded-2xl p-5 mb-8 text-center">
            <h3 className="text-green-400 font-bold text-xl">
              📲 Reminder
            </h3>

            <p className="mt-3 text-gray-300">
              If you haven't already sent your payment screenshot,
              please send:
            </p>

            <div className="mt-4 space-y-2">
              <p>✅ Team Name</p>
              <p>✅ Transaction ID</p>
              <p>✅ Payment Screenshot</p>
            </div>

            <p className="mt-5 text-2xl font-bold text-white">
              WhatsApp
            </p>

            <p className="text-green-400 text-xl font-bold">
              8422026534
            </p>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => (window.location.href = "/")}
              className="bg-orange-500 hover:bg-orange-400 text-black font-bold py-4 rounded-xl shadow-lg"
            >
              🏠 Back to Home
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://wa.me/918422026534"
              target="_blank"
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center"
            >
              💬 Open WhatsApp
            </motion.a>
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            Thank you for choosing 4DG TOURNAMENT ❤️
          </p>
        </div>
      </motion.div>
    </main>
  );
}