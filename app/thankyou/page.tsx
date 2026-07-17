"use client";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-[#151515] border border-orange-500 rounded-xl p-8 text-center max-w-md w-full">

        <h1 className="text-4xl font-bold text-orange-500 mb-4">
          🎉 Booking Submitted
        </h1>

        <p className="text-white text-lg mb-4">
          Thank you for registering for
        </p>

        <h2 className="text-2xl font-bold text-white mb-6">
          🏆 4DG TOURNAMENT
        </h2>

        <p className="text-gray-300 mb-6">
          Your payment has been submitted successfully.
          <br />
          Please wait for admin approval.
        </p>

        <div className="bg-orange-500 text-black font-bold rounded-lg p-4">
          Booking Status: ⏳ Pending
        </div>
        <div className="mt-6 text-center">
  <p className="text-gray-300 mb-4">
    You can return to the home page.
  </p>

  <button
    onClick={() => (window.location.href = "/")}
    className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-6 py-3 rounded-lg"
  >
    🏠 Go to Home Page
  </button>
</div>

      </div>
    </main>
  );
}