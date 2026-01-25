// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const PROTECTED_ROUTES = ['/dashboard', '/env', '/settings']

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('env_token')?.value
  const isProtected = PROTECTED_ROUTES.some(path =>
    req.nextUrl.pathname.startsWith(path)
  )

  if (!isProtected) return NextResponse.next()

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  
  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
    )

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/', req.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
}
