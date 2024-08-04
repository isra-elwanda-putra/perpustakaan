'use server';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { generateTokens } from '@/lib/tokenManager';
import { cookies } from 'next/headers';

export const POST = async (req) => {
    const body = await req.json();
    const { email, password } = body;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const { accessToken, refreshToken, expiresInAccessToken, expiresInRefreshToken } = generateTokens(user.uid);
        // Set cookie with refreshToken for path '/admin/*'
        const cookieStore = cookies();
        cookieStore.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: expiresInRefreshToken, // 2 jam
            path: '/admin',
        });
        return new Response(JSON.stringify({ success: true, accessToken, expiresInAccessToken }));
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: 'Login failed', error: error.message }), { status: 400 });
    }
}