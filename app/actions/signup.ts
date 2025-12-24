'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signup(formData: FormData) {
  const email = formData.get('email')?.toString().trim();
  const password = formData.get('password')?.toString();

  // Get the cookie store once
  const cookieStore = await cookies();

  if (!email || !email.includes('@')) {
    cookieStore.set('registration_error', 'Please enter a valid email', {
      path: '/register',
      maxAge: 30,
    });
    redirect('/register');
  }

  if (!password || password.length < 6) {
    cookieStore.set('registration_error', 'Password must be at least 6 characters', {
      path: '/register',
      maxAge: 30,
    });
    redirect('/register');
  }

  // On success, clear the error cookie
  cookieStore.delete('registration_error');

  // Save to DB here...

  redirect('/');
}