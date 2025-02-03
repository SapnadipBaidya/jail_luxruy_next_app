// frontend/src/middleware.js
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Define your protected routes
const protectedRoutes = [
  "/userContact",
  "/orders",
  "/wishlist",
  "/cart",
  "/payment",
  "/profile"
];

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export async function middleware(request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  const refreshToken = cookieStore.get("refreshToken")?.value || null;
  const { pathname } = request.nextUrl;

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Redirect to the login-signup page if no token is found
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login-signup", request.url));
    }

    console.log(
      "Trying to access protected route using middleware with token:",
      accessToken
    );

    try {
      console.log("trying to validate client accessToken ", accessToken);
      // Verify the token by calling your backend /success endpoint
      const verifyResponse = await apiClient.get("/success", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // If the response is not OK, treat the token as invalid
      console.log("verifyResponse ",verifyResponse.status,verifyResponse.data)
      if (verifyResponse.status!=200) {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      console.error(
        "Token verification failed: trying with refresh token",
        error
      );
      const refreshResponse = await apiClient.get("/auth/refresh", {
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      });

      console.log("refreshResponse ",refreshResponse.status,refreshResponse.data)
      if (refreshResponse.status==200) {
        console.log("refreshResponse",refreshResponse.data)

        const cookieStore = await cookies();
        const newAccessToken = refreshResponse.data.accessToken || null;
      
        const newRefreshToken = refreshResponse.data.refreshToken || null;

        console.log("after refresh accessToken ", newAccessToken , " refreshToken ",newRefreshToken)
        // Update the access token cookie
        const response = NextResponse.next();
        cookieStore.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 15 * 60, // 15 minutes
        });

        return response;
      } else {
        // Refresh token is invalid, redirect to login
        return NextResponse.redirect(new URL("/login-signup", request.url));
      }
    }
  }

  // Continue to the requested page if not protected or verification succeeded
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Match all request paths except those starting with:
    // api/auth, _next/static, _next/image, favicon.ico, or public
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
