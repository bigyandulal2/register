// app/register/page.tsx
import { signup } from '../actions/signup';
import { cookies } from 'next/headers';

export default async function RegisterPage() {
  const cookieStore =await cookies();
  const errorMessage = cookieStore.get('registration_error')?.value;


  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-8">User Login</h1>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      <form action={signup} className="space-y-4">
        <input name="email" type="email" placeholder='enter your email'  className="w-full p-3 border rounded" />
        <input name="password" type="password" placeholder='enter your password' className="w-full p-3 border rounded" />
        <button type="submit" className="w-full bg-black text-white py-3 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}