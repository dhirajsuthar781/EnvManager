// lib/auth/getCurrentUser.ts
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

export async function getCurrentUser(): Promise<{ userId: string } | null> {
     const token = (await cookies()).get('env_token')?.value
     if (!token) return null

     try {
          const { payload: data } = await jwtVerify(
               token,
               new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
          )

          return {
               userId: data.userId as string
          }
     } catch {
          return null
     }
}
