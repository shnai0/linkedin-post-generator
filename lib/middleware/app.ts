import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function AppMiddleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as {
    email?: string;
    user?: {
      createdAt?: string;
    };
  };

  // if there's no token and the path isn't "/", redirect to "/"
  if (!token?.email && path !== "/") {
    return NextResponse.redirect(new URL("/", req.url));

    // if there's a token
  } else if (token?.email) {
    // if the user was created in the last 10 seconds, redirect to "/"
    if (
      token?.user?.createdAt &&
      new Date(token?.user?.createdAt).getTime() > Date.now() - 1000000 &&
      path !== "/"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    } else if (path === "/login") {
      // if the path is /login and there's a token, redirect to "/"
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
