import { NextResponse } from "next/server";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req: NextRequestWithAuth) {
    // authorize roles
    const url = req.nextUrl.pathname;
    const userRole = req?.nextauth?.token?.user?.role;
    // client side protection
    if (url?.includes("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token) {
          return false;
        }
        return true;
      },
    },
  }
);

// client and server side protection
export const config = {
  matcher: [
    "/dashboard/user/:path*",
    "/dashboard/admin/:path*",
    "/api/user/:path*",
    "/api/admin/:path*",
  ],
};
