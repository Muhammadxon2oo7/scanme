import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  is_staff: boolean;
  exp?: number;
  [key: string]: any;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // 🔓 0️⃣ product/view/:id sahifasini hammaga ochiq qilamiz
  if (pathname.startsWith("/product/view/")) {
    return NextResponse.next();
  }

  // 1️⃣ Agar token mavjud bo'lmasa, login sahifasiga yo'naltirish
  if (!token) {
    if (pathname.startsWith("/manufacturer") || pathname.startsWith("/employer")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // 2️⃣ Token mavjud bo'lsa — decode qilib rolni aniqlaymiz
  let decoded: DecodedToken | null = null;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3️⃣ Token muddati o'tganmi — tekshiramiz
  if (decoded?.exp && Date.now() >= decoded.exp * 1000) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isStaff = decoded?.is_staff;

  // 4️⃣ Agar /login sahifasiga kirsa — roliga qarab dashboardga yo'naltiramiz
  if (pathname === "/login") {
    if (isStaff) {
      return NextResponse.redirect(new URL("/manufacturer/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/employer/dashboard", request.url));
    }
  }

  // 5️⃣ Staff bo'lsa, /manufacturer sahifalariga ruxsat, boshqasini bloklash
  if (pathname.startsWith("/manufacturer") && !isStaff) {
    return NextResponse.redirect(new URL("/employer/dashboard", request.url));
  }

  // 6️⃣ Staff bo'lmasa (xodim), /employer sahifalariga ruxsat, boshqasini bloklash
  if (pathname.startsWith("/employer") && isStaff) {
    return NextResponse.redirect(new URL("/manufacturer/dashboard", request.url));
  }

  return NextResponse.next();
}

// 7️⃣ Middleware faqat shu yo'llarda ishlaydi
export const config = {
  matcher: [
    "/login",
    "/manufacturer/:path*",
    "/employer/:path*",
    "/product/view/:path*", // ✅ yangi ochiq route qo‘shildi
  ],
};
