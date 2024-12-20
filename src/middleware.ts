import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "./config/supabase-server-config";

export async function middleware(request: NextRequest) {
  try {
    console.log("Middleware executed in " + request.nextUrl.pathname);
    const route = request.nextUrl.pathname;
    const supabaseServerConfig = await createClient();
    const { data } = await supabaseServerConfig.auth.getUser();
    const user = data.user;
    const isPublicRoute = [
      "/auth/sign-in",
      "/auth/sign-up",
      "/auth/forgot-password",
      "/auth/reset-password",
    ].includes(route);
    const isPrivateRoute = !isPublicRoute;

    // if the loggedin user is present and user is trying to access any public route , redirect to home page
    if (user && isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // if the loggedin user is not present and user is trying to access any private route , redirect to sign-in page
    if (!user && isPrivateRoute) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
