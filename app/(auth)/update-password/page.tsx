"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { publicApi } from "@/app/utils/axios";
import { useGlobalContext } from "@/app/context/GlobalContext";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const {email,otp}=useGlobalContext();

  async  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try{
      const form=new FormData();
      form.append("email",email);
      form.append("password",confirmPassword);
      form.append("otp",otp);
      const res = await publicApi.post("/api/v1/auth/update-password", form);
    
      toast.success("Password reset successful!");
      router.push("/");


    }
    catch(err:any){
         toast.error(err.response.data.message ||"something went wrong ");

    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
       
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:opacity-90 text-white py-3 rounded-md font-medium  transition cursor-pointer"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-sm text-black/50 hover:underline cursor-pointer"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}