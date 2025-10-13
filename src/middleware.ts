import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const refreshToken = request.cookies.get("refresh_token")?.value
  const pathname = request.nextUrl.pathname

  // Agar login sahifasiga token bilan kirsa
  if (token && refreshToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/manufacturer/dashboard", request.url))
  }

  // Agar token yo'q bo'lsa va himoyalangan yo'lga kirsa
  if (!token && pathname.startsWith("/manufacturer")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}
