"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      console.log("Email:", email);
      console.log("Password:", password);

      const user = await signInWithEmailAndPassword(auth, email, password);

      alert("Login Successful!");
      console.log(user);

      router.push("/admin/dashboard");
    } catch (error: any) {
      console.log("Firebase Error:", error);
      alert(error.code);
    }
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-[#151515] border border-orange-500 rounded-xl p-8 w-[400px]">
        <h1 className="text-3xl text-orange-500 font-bold text-center mb-6">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-[#1a1a1a] border border-orange-500 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded bg-[#1a1a1a] border border-orange-500 text-white"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 text-black font-bold py-3 rounded-lg"
        >
          Login
        </button>
      </div>
    </main>
  );
}