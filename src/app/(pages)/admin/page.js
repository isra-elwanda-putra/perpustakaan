"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/app/hooks/useAuth';

const AdminPage = () => {
    const router = useRouter();
    const isLoggedIn = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/admin/dashboard');
        } else {
            router.push('/admin/login');
        }
    }, [isLoggedIn, router]);

    return (
        <div>
            <p>Redirecting...</p>
        </div>
    );
}

export default AdminPage;
