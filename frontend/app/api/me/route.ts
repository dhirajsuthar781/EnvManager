import { getCurrentUser } from "@/lib/auth/getCurrentUser"
import { NextResponse } from "next/server"

// api/me/route.ts
export async function GET() {
  const user = await getCurrentUser()
  return NextResponse.json({ user })
}
