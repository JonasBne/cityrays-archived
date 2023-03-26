import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export default async function middleware(req: NextRequest) {
  // to avoid flickering content we check for user authentication first
  // and then decide the redirect page based on that, because useSession is
  const pathName = req.nextUrl.pathname;
  const protectedPaths = ["/", "/home"];
  const isProtectedPath = protectedPaths.includes(pathName);

  const res = NextResponse.next();

  if (isProtectedPath) {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.rewrite(new URL("/login", req.url));
    } else {
      return NextResponse.rewrite(new URL("/home", req.url));
    }
  }

  if (pathName === pathName.toLowerCase()) return NextResponse.next();

  return NextResponse.redirect(
    new URL(req.nextUrl.origin + pathName.toLowerCase())
  );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/about/:path*",
};
