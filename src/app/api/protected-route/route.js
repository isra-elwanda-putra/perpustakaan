'use server';
import { NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/tokenManager';

export const GET = async (req) => {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
        return new NextResponse(JSON.stringify({ success: false, message: 'No token provided' }), { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = verifyAccessToken(token);
        // Lakukan apa pun dengan decoded token, misal ambil data pengguna dari database
        // Example of protected data
        const protectedData = {
            message: 'This is protected data',
            userId: decodedToken.userId,
        };
        return new NextResponse(JSON.stringify({ success: true, data: protectedData }), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ success: false, message: 'Invalid token', error: error.message }), { status: 401 });
    }
};
