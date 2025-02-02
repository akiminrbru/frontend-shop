import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/personal/profile"];
const publicRoutes = ["/login", "/register", "/"];

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	const isPublicRoute = publicRoutes.includes(path);

	const accessToken = (await cookies()).get("access-token")?.value;
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
		method: "GET",
		credentials: "include",
		headers: {
			Cookie: `access-token=${accessToken}`,
		},
	});

	if (isProtectedRoute && !response.ok) {
		return NextResponse.redirect(new URL("/login", req.nextUrl));
	}

	return NextResponse.next();
}

// Routes Middleware should not run on
// export const config = {
// 	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };
