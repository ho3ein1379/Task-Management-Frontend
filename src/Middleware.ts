import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { endpoints } from "@/src/lib/config/endpoints";

const publicPaths = [endpoints.auth.login, endpoints.auth.register];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token && pathname !== "/") {
    return NextResponse.redirect(new URL(endpoints.auth.login, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
