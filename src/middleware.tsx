import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/about" ||
    path === "/about/:path*" ||
    path === "verifyemail";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/about",
    "/about/:path*",
    "/verifyemail",
    "/profile",
    "/profile/:path*",
  ],
};
