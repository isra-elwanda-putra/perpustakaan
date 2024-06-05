"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/app/components/AdminDashboard';

const AdminHome = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Fungsi untuk memeriksa apakah pengguna telah login sebagai admin
    const isUserAdmin = () => {
        // Lakukan pengecekan otentikasi di sini
        // Misalnya, Anda dapat menggunakan token atau informasi login dari session
        // Contoh sederhana: periksa apakah ada informasi login yang disimpan di local storage
        const adminToken = localStorage.getItem('adminToken');
        return !!adminToken; // Mengembalikan true jika adminToken ada, false jika tidak
    };

    useEffect(() => {
        // Lakukan pengecekan otentikasi saat komponen dimuat
        setIsLoggedIn(isUserAdmin());
    }, []); // [] artinya efek hanya dijalankan sekali saat komponen dimuat

    // Jika pengguna belum login sebagai admin, arahkan ke halaman login
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('admin/login');
        }
    }, [isLoggedIn]);

    // Jika pengguna belum login sebagai admin, tidak menampilkan halaman admin
    if (!isLoggedIn) {
        return null;
    }

    // Jika pengguna telah login sebagai admin, tampilkan halaman admin
    return <AdminDashboard />;
}

export default AdminHome;
