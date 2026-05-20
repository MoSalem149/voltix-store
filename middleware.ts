import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(_req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

// Only protect these specific routes — everything else is public
export const config = {
  matcher: [
    "/cart/:path+",
    "/checkout/:path*",
    "/profile/:path*",
    "/wishlist",
    "/orders/:path*",
  ],
};
