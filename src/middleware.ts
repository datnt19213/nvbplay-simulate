import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

// middleware to handle before directing when client access route that match to the config matches routes
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/builder")) {
    request.headers.set("x-layout", "builder");
  } else {
    request.headers.set("x-layout", "main");
  }
  if (request.nextUrl.pathname.startsWith("/builder")) {
    return NextResponse.redirect(new URL("/builder/build-new", request.url));
  }
  if (
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/profile/personal-info")
  ) {
    return NextResponse.redirect(
      new URL("/profile/personal-info/overview", request.url)
    );
  }
}

// watcher the routes access link to activating the middleware
export const config = {
  matcher: ["/profile", "/profile/personal-info", "/builder"],
};
