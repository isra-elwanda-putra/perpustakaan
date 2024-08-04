"use client";
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

const RootLayoutClient = ({ children }) => {
    const pathname = usePathname();
    const isAdminRoute = /^\/admin(\/.*)?$/.test(pathname);

    return (
        <div>
            {!isAdminRoute && <Navbar />}
            <main>
                {children}
            </main>
        </div>
    );
}

export default RootLayoutClient;
