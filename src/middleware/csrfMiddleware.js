import { NextResponse } from 'next/server';
import csrf from 'csrf';

const tokens = new csrf();

export function csrfMiddleware(request) {
    const csrfToken = request.headers.get('csrf-token');

    if (!tokens.verify(process.env.CSRF_SECRET, csrfToken)) {
        return new NextResponse('Invalid CSRF token', { status: 403 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*', // Only apply middleware to API routes
};
