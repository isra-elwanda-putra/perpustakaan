'use server';
import { verifyRefreshToken, generateTokens } from '@/lib/tokenManager';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export const POST = async (req) => {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refreshToken');
    if (!refreshToken) {
        return new NextResponse(JSON.stringify({ success: false, message: 'No refresh token' }), { status: 401 });
    }
    try {
        const decoded = verifyRefreshToken(refreshToken.value);
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(decoded.userId);

        cookieStore.set('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 2 * 60 * 60, // 2 jam
            path: '/admin',
        });
        return new NextResponse(JSON.stringify({ success: true, accessToken: newAccessToken }), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ success: false, message: 'Invalid refresh token', error: error.message }), { status: 401 });
    }
};

