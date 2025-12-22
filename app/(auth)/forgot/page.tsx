"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { isValidEmail } from "../../utils/validator";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../context/GlobalContext";
import { publicApi } from "@/app/utils/axios";
export default function Page() {
  const {email,setEmail}=useGlobalContext();
  const [loading, setLoading] = useState(false);
 
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true); // ← Now properly set

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", email);
      const res = await publicApi.post("/api/v1/auth/reset-password", formDataToSend);
      const data = res.data;
      // console.log("Reset response:", data);
      toast.success("Password reset link sent! Check your email ");
      router.push("/verify-otp");
      
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <p className="text-center text-gray-600 mb-8">
          Enter your email and we'll send you a otp code to reset password
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center text-blue-600 cursor-pointer">
          <button
            type="button" 
            onClick={() => router.push("/")} 
            
          >
            ← Back to login
          </button>
        </div>
      </div>
    </div> 
  );
}
