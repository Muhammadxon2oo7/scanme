import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const refreshToken = request.cookies.get("refresh_token")?.value
  const pathname = request.nextUrl.pathname

  // Agar token va refresh_token mavjud bo'lsa va foydalanuvchi /login ga kirmoqchi bo'lsa
  if (token && refreshToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/manufacturer/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/login"],
}