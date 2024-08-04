"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './Navbar';

const RootLayoutApp = ({ children }) => {
    const router = useRouter();
    const isAdminLoginPage = router.pathname === '/admin/login';
    const isAdminDashboard = router.pathname && /^\/admin(\/.*)?$/.test(router.pathname);
    const isAdminRoute = /^\/admin(\/.*)?$/.test(router.pathname);

    const isLoggedIn = () => {
        // Periksa apakah token login ada di localStorage
        const token = localStorage.getItem('authToken');
        return token !== null;
    };
    useEffect(() => {
        if (router.pathname) {

            if (isAdminRoute && !isLoggedIn() && !isAdminLoginPage) {
                router.push('admin/login');
            }
            // if (isLoggedIn() && isAdminDashboard) {
            //     router.push('admin/dashboard');
            // }
        }
    }, [router.pathname]);

    return (
        <div>
            {isAdminRoute ? null : <Navbar />}
            {isAdminDashboard ? <AdminDashboard /> : children}
        </div>
    );
}

export default RootLayoutApp;

// app/layout.js
"use client";
import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar';

const RootLayoutApp = ({ children }) => {
    const pathname = usePathname();
    const isAdminRoute = /^\/admin(\/.*)?$/.test(pathname);

    return (
        <html lang="en">
            <body>
                {!isAdminRoute && <Navbar />}
                {children}
            </body>
        </html>
    );
}

export default RootLayoutApp;
