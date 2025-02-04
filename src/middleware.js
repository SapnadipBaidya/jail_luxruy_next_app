import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Define protected routes
const protectedRoutes = [
  "/userContact",
  "/orders",
  "/wishlist",
  "/cart",
  "/payment",
  "/profile",
];

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // Ensure cookies are included in requests
});

export async function middleware(request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  const refreshToken = cookieStore.get("refreshToken")?.value || null;
  const { pathname } = request.nextUrl;

  console.log("accessToken:", accessToken);
  console.log("refreshToken:", refreshToken);

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login-signup", request.url));
    }

    try {
      console.log("Validating access token...");
      const verifyResponse = await apiClient.get("/success", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (verifyResponse.status !== 200) {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      console.error("Access token validation failed:", error);
      console.log("Attempting refresh...");

      try {
        const refreshResponse = await apiClient.get("/auth/refresh", {
          headers: {
            Cookie: `refreshToken=${refreshToken}`,
          },
        });
        console.log("Refresh response:", refreshResponse.data);

        const newAccessToken = refreshResponse.data.accessToken;
        const newRefreshToken = refreshResponse.data.refreshToken;

        if (!newAccessToken || !newRefreshToken) {
          throw new Error("Invalid refresh response");
        }

        console.log("Updated tokens:", newAccessToken, newRefreshToken);

        // Set new cookies
        const response = NextResponse.next();
        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 15 * 60, // 15 minutes
        });

        response.cookies.set("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        return response;
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        return NextResponse.redirect(new URL("/login-signup", request.url));
      }
    }
  }

  return NextResponse.next();
}

// Configure paths for middleware
export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
