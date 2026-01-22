'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupInput } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function SignupForm() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(values: SignupInput) {
    if (loading) return; // guard against double submit

    setLoading(true);
    setSuccess(false);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        signal: controller.signal,
      });

      let data: any;
      try {
        data = await res.json();
      } catch {
        throw new Error('Invalid server response');
      }

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || 'Registration failed');
      }

      toast.success(data.message ?? 'Account created');
      setSuccess(true);
      form.reset();
    } catch (err: any) {
      if (err.name === 'AbortError') {
        toast.error('Request timed out. Please try again.');
      } else if (!navigator.onLine) {
        toast.error('No internet connection');
      } else {
        toast.error(err.message || 'Something went wrong');
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="pt-5 space-y-2"
    >
      <p className="text-xl font-semibold text-center pb-5">
        Register Please
      </p>

      <Input
        placeholder="Username"
        disabled={loading}
        {...form.register('username')}
      />
      <p className="text-red-500 text-sm">
        {form.formState.errors.username?.message}
      </p>

      <Input
        type="password"
        placeholder="Password"
        disabled={loading}
        {...form.register('password')}
      />
      <p className="text-red-500 text-sm">
        {form.formState.errors.password?.message}
      </p>

      {success && (
        <p className="text-green-600 text-center">
          Account created 🎉 You can now login.
        </p>
      )}

      <Button isLoading={loading} type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
}
