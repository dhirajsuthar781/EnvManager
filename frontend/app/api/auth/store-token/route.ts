import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
     const { token } = await req.json();

     if (!token) {
          return NextResponse.json(
               { error: 'Token required' },
               { status: 400 }
          );
     }

     const cookieStore = await cookies();

     cookieStore.set('env_token', token, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24, // 1 day
     });
     console.log('Token stored successfully');
     return NextResponse.json({ success: true });
}
