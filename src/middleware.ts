import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export default function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname;

  if (pathName === pathName.toLowerCase()) return NextResponse.next();

  return NextResponse.redirect(
    new URL(req.nextUrl.origin + pathName.toLowerCase())
  );
}
