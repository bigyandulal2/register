"use client";

import { useGlobalContext } from "../context/GlobalContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function ProfilePage() {
  const { user, accessToken } = useGlobalContext();
  const router = useRouter();

  console.log("User:", user);
  console.log("Access Token:", accessToken);

  // Show nothing or a loader while checking auth (optional: add a loading state later)
  if (!user) {
    return null;
  }

  async function handleLogout() {
    try {
      // Call your logout endpoint (adjust based on your auth method)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {},
      });

      if (res.ok) {
       toast.success("logged out successfull");
        router.push("/");
      } else {
       toast.error("logged out faileddd");
      }
    } catch (error) {
      console.error("Logout error:", error);
     
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-black p-8 text-white">
          <h1 className="text-3xl font-bold text-center">Welcome back!</h1>
          <p className="text-center mt-2 opacity-90">Your Profile</p>
        </div>

        {/* Profile Info Card */}
        <div className="p-8 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-3xl font-bold text-gray-600 border-4 border-white shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-500">Member</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 bg-gray-50 rounded-xl p-6">
            <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
              <span className="text-gray-600 font-medium">Email</span>
              <span className="text-gray-900 font-semibold">{user.email}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
              <span className="text-gray-600 font-medium">Phone</span>
              <span className="text-gray-900 font-semibold">{user.phone}</span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}