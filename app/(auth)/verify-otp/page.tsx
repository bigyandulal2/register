"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { useGlobalContext } from "../../context/GlobalContext";

export default function VerifyOTP() {
  const {email,setEmail,otp,setOtp}=useGlobalContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !otp) {
      toast.error("Please fill in both fields");
      return;
    }

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend=new FormData();
      formDataToSend.append("email",email);
      formDataToSend.append("otp",otp);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Invalid OTP");
      }

      toast.success("OTP verified successfully! 🎉");
     router.push("/update-password");
       
     
    } catch (err: any) {
      toast.error(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-black/50 p-8 text-white text-center">
          <h1 className="text-3xl font-bold">Verify Your OTP</h1>
          <p className="mt-2 opacity-90">We sent a 6-digit code to your email</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition text-center"
                disabled
              />
            </div>

            {/* OTP Field */}
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Enter 6-Digit OTP
              </label>
              <input
                id="otp"
                type="text"
                maxLength={6}
                placeholder="••••••"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} // Only numbers
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl font-mono tracking-widest  transition"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black font-semibold py-4 rounded-lg text-white disabled:cursor-not-allowed transition hover:opacity-90 cursor-pointer shadow-lg"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          {/* Resend / Back Links */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={() => toast("Resend feature coming soon!")}
                className="font-medium text-purple-600 hover:text-purple-700 underline"
              >
                Resend OTP
              </button>
            </p>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}