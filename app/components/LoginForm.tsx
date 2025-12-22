"use client";

import { useState } from "react";
import { isValidEmail } from "../utils/validator";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/GlobalContext";
import { publicApi } from "../utils/axios";
export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router=useRouter();
  const {user,setUser,setAccessToken}=useGlobalContext();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
  
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      setLoading(false);
      return;
    }
  
    if (!isValidEmail(formData.email)) {
      toast.error("Invalid email format");
      setLoading(false);
      return;
    }
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
  
      const res = await publicApi.post("/api/v1/auth/login", formDataToSend);
  
      // Axios automatically returns JSON in res.data
      const data = res.data;
  
      setAccessToken(data.access_token);
       localStorage.setItem("token",data.access_token);
      setUser(data.user);
     
  
      toast.success("Logged in successfully");
      router.push("/user");
  
    } catch (err: any) {
      console.log(err);
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 className="mb-6 text-center text-2xl font-bold uppercase">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-lg border px-4 py-2 focus:border-black focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full rounded-lg border px-4 py-2 focus:border-black focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-lg bg-black py-2 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="relative my-4 flex items-center">
          <div className="h-px w-full bg-gray-300" />
          <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-sm text-gray-500">
            OR
          </span>
        </div>

        {/* GitHub login */}
        {/* <button
          type="button"
          onClick={() => signIn("github")}
          className="flex items-center justify-center gap-2 rounded-lg border py-2 font-semibold transition hover:bg-gray-100"
        >
          Sign in with GitHub
        </button> */}

        {/* Signup */}
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <span className="cursor-pointer text-green-600  font-extrabold underline pb-4 text-black hover:underline" onClick={()=>router.push("/signup")}>
            Sign up
          </span>
        </p>
        {/* forgot password */}
        <p className="text-center text-sm">
          Forgot password?{" "}
          <span className="cursor-pointer font-semibold text-red-600  underline" onClick={()=>router.push("/forgot")}>
            forgot
          </span>
        </p>
      </form>
    </div>
  );
}
