import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authToken = cookies().get("authToken");

  if (!authToken && req.nextUrl.pathname.match("/(chat).*"))
    return NextResponse.redirect(new URL("/login", req.url));

  if (authToken && req.nextUrl.pathname.match("/(login|signup)"))
    return NextResponse.redirect(new URL("/chat", req.url));

  return NextResponse.next();
}

/*
export const config = {
  matcher: ["/(chat.*)"],
};
*/
