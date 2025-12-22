
"use client";

import {  useState } from "react";

import { isValidNepaliPhone,isValidEmail } from "../../utils/validator";
import { useRouter } from "next/navigation";
import { publicApi } from "@/app/utils/axios";
import toast from "react-hot-toast";
const initialState={
   name:"",
   email:"",
   password:"",
   phone:""
}

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [formData,setFormData]=useState(initialState);
  const router=useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    if(!formData.name ||!formData.email || !formData.password || !formData.phone ){
       alert("please fill up the form");
       setLoading(false);
        return;
    }
    if(!isValidNepaliPhone(formData.phone)){
       alert("please enter the correct nepali phone number ");
       setLoading(false);
       return;
    }
    if(!isValidEmail(formData.email)){
       alert("please enter the correct email format");
       setLoading(false);
       return;
    }
    const formDataToSend=new FormData();
    formDataToSend.append("name",formData.name);
    formDataToSend.append("email",formData.email);
    formDataToSend.append("password",formData.password);
    formDataToSend.append("phone",formData.phone);

    // sending form data to the backend routes
    try{
      const res = await publicApi.post("/api/v1/auth/register", formDataToSend);
            // Axios automatically returns JSON in res.data
     const data = res.data;
      setLoading(false);
     toast.success("successfully register,please login again")
      // console.log(data);
      router.push("/");

    }
    catch(error:any){
      toast.error(error.response?.data?.message || "Invalid credentials");
  // console.log("error here causing is why let you know",error);
   setLoading(false);

    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value, 
    }));
  };


  return (
     
     <main className="h-screen flex items-center justify-center" >  
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        {/* Close button */}
        <button
         
          className="absolute right-3 top-3 text-gray-500 hover:text-black"
        >
          
        </button>

        <h2 className="mb-4 text-xl font-semibold">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            className="w-full rounded-md border px-3 py-2"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            name="email"
            type="text"
            placeholder="Email"
          className="w-full rounded-md border px-3 py-2"
          value={formData.email}
          onChange={handleChange}
          />

          <input
            name="password"
            type="text"
            placeholder="Password"  
            className="w-full rounded-md border px-3 py-2"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone" 
            className="w-full rounded-md border px-3 py-2"
            value={formData.phone}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black py-2 text-white disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <button className="w-full rounded-md bg-black py-2 text-white disabled:opacity-50 mt-4 cursor-pointer" onClick={()=>router.push("/")}>
           Back to Login
        </button>
      </div>
      </main>
  );
}
