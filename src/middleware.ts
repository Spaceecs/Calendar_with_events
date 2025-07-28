import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/auth')) {
        return NextResponse.next();
    }

    const session = req.cookies.get('session')?.value;

    if (!session) {
        const loginUrl = new URL('/auth/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};
