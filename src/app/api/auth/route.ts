import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/shared/lib/firebaseAdmin';
import * as cookie from 'cookie';

export async function POST(request: NextRequest) {
    try {
        const { idToken } = await request.json();

        if (!idToken) {
            return NextResponse.json({ message: 'ID token is required' }, { status: 400 });
        }

        const decodedToken = await adminAuth.verifyIdToken(idToken);

        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 днів в мс
        const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

        const res = NextResponse.json({ message: 'Logged in successfully', uid: decodedToken.uid });

        res.headers.set('Set-Cookie', cookie.serialize('session', sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: expiresIn / 1000,
            path: '/',
            sameSite: 'lax',
        }));

        return res;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
}
