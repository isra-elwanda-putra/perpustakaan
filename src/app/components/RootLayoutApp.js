"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './Navbar'; // Pastikan path ke Navbar sesuai
import AdminDashboard from './AdminDashboard'; // Path ke AdminDashboard sesuai

const RootLayoutApp = ({ children }) => {
    const router = useRouter();
    const isAdminLogin = router.pathname === '/admin/login';
    const isAdminDashboard = router.pathname && /^\/admin(\/.*)?$/.test(router.pathname);

    useEffect(() => {
        if (router.pathname) {
            const isAdminRoute = /^\/admin(\/.*)?$/.test(router.pathname);

            if (isAdminRoute && !isUserLoggedIn() && !isAdminLogin) {
                router.push('admin/login');
            }
        }
    }, [router.pathname]);

    const isUserLoggedIn = () => {
        // Periksa apakah token login ada di localStorage
        const token = localStorage.getItem('authToken');
        return token !== null;
    };

    return (
        <div>
            {!isAdminLogin && <Navbar />}
            {isAdminDashboard ? <AdminDashboard /> : children}
        </div>
    );
}

export default RootLayoutApp;
