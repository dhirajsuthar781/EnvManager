'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupInput } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SignupForm() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(values: SignupInput) {
    setLoading(true);
    const res = await fetch('http://localhost:4000/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    let data = await res.json()

    if (res.ok && data.success) {
      setSuccess(true);
      toast.success(data.message)
      form.reset();
    }else{
      toast.error(data.message)
    
    }

    setLoading(false);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="  pt-5  space-y-2">
      <p className=' text-xl font-semibold text-center pb-5'>Register Please</p>
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

      {success && <p className="text-green-600">Account created 🎉</p>}

      <Button isLoading={loading} type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
}
