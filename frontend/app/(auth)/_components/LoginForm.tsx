'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useState } from 'react';
import { storeToken } from '@/lib/api/todos';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'


export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginInput) {
    setError(null);
    setLoading(true);
    const res = await fetch('http://localhost:4000/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    let resData = await res.json()

    if (res.ok && resData.success) {
      toast.success(resData.message)
      form.reset();
    } else {
      toast.error(resData.message)
      setError(resData.message);
      return;
    }

    // store JWT securely in httpOnly cookie
    let storeTokenRes = await storeToken(resData.accessToken);
    setLoading(false);
    // redirect or refresh
    router.push('/dashboard')
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="  pt-5  space-y-2">
      <p className=' text-xl font-semibold text-center pb-5'>Login Please</p>
      <Input placeholder="Username" {...form.register('username')} />
      <p className="text-red-500 text-sm">
        {form.formState.errors.username?.message}
      </p>

      <Input
        type="password"
        placeholder="Password"
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
