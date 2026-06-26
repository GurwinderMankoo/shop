import { NextResponse, NextRequest } from 'next/server';

export function proxy(request: NextRequest) {

    const session = request.cookies.get('session')?.value;

    const pathname = request.nextUrl.pathname;

    const authRoutes = ["/sign-in", "/sign-up"];

    const isAuthRoute = authRoutes.includes(pathname);

    if ((pathname.startsWith('/account') || pathname.startsWith('/admin')) && !session) {
        const loginUrl = new URL("/sign-in", request.url);

        loginUrl.searchParams.set(
            "callbackUrl",
            pathname + request.nextUrl.search
        );

        return NextResponse.redirect(loginUrl);
    }


    if (isAuthRoute && session) {
        return NextResponse.redirect(new URL("/products", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/account/:path*",
        "/admin/:path*",
        "/sign-in",
        "/sign-up",
    ],
};