import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authToken = cookies().get("authToken");

  return authToken
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/(chat.*)"],
};
