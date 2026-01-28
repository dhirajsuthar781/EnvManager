import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = { children: React.ReactNode }

export default async function layout({ children }: Props) {
     const d = await getCurrentUser();
     if (d != null) {
          redirect('/dashboard');
     }
     
     return (
          <>

               {children}
          </>
     )
}