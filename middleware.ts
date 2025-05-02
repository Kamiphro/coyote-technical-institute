import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define protected routes
  const studentProtectedRoutes = [
    "/student-dashboard",
    "/course-registration",
    "/drop-classes",
    "/change-major",
    "/withdraw",
  ]

  const adminProtectedRoutes = ["/admin-dashboard", "/admin-courses", "/admin-students", "/admin-notifications"]

  // Check if the path is a student protected route
  if (studentProtectedRoutes.some((route) => path.startsWith(route))) {
    const studentId = request.cookies.get("studentId")?.value

    if (!studentId) {
      return NextResponse.redirect(new URL("/student-login", request.url))
    }
  }

  // Check if the path is an admin protected route
  if (adminProtectedRoutes.some((route) => path.startsWith(route))) {
    const adminId = request.cookies.get("adminId")?.value

    if (!adminId) {
      return NextResponse.redirect(new URL("/admin-login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/student-dashboard/:path*",
    "/course-registration/:path*",
    "/drop-classes/:path*",
    "/change-major/:path*",
    "/withdraw/:path*",
    "/admin-dashboard/:path*",
    "/admin-courses/:path*",
    "/admin-students/:path*",
    "/admin-notifications/:path*",
  ],
}
