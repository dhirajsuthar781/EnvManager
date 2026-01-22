'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { storeToken } from '@/lib/api/todos';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginInput) {
    if (loading) return; // prevent double submit

    setError(null);
    setLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        signal: controller.signal,
      });

      let resData: any;
      try {
        resData = await res.json();
      } catch {
        throw new Error('Invalid server response');
      }

      if (!res.ok || !resData?.success) {
        throw new Error(resData?.message || 'Login failed');
      }

      toast.success(resData.message ?? 'Login successful');
      form.reset();

      await storeToken(resData.accessToken);

      router.push('/dashboard');
    } catch (err: any) {
      if (err.name === 'AbortError') {
        toast.error('Request timed out. Please try again.');
        setError('Request timed out');
      } else if (!navigator.onLine) {
        toast.error('No internet connection');
        setError('You are offline');
      } else {
        toast.error(err.message || 'Something went wrong');
        setError(err.message || 'Login failed');
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
        Login Please
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

      {error && <p className="text-red-600">{error}</p>}

      <Button isLoading={loading} type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
