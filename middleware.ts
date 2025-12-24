import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Basic認証の認証情報
const VALID_USER = "denkyasu";
const VALID_PASSWORD = "Xk9mP2wQ7n";

export function middleware(request: NextRequest) {
  // Skip auth for health check and static files
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api/health") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const basicAuth = request.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, password] = Buffer.from(authValue, "base64")
      .toString()
      .split(":");

    if (user === VALID_USER && password === VALID_PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

