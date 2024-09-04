import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // กัน page route ถ้า ไม่มีข้อมูลใน session (ยังไม่ได้ login)
  const protectedRoutes = ["/profile", "/cart", "/checkout", "/order"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
  return NextResponse.next();
}
