import React, { useState } from 'react';

const Navbar = () => {
    const [userRole, setUserRole] = useState('user'); // Ganti 'user' menjadi 'admin' untuk melihat tampilan admin

    return (
        <div className="navbar bg-base-200 shadow-lg">
            <div className="flex-1 px-2 mx-2">
                <span className="text-lg font-bold">Perpustakaan XYZ</span>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    {userRole === 'admin' ? (
                        <>
                            <li><a href="#dashboard">Dashboard</a></li>
                            <li><a href="#manage-books">Manage Books</a></li>
                            <li><a href="#return-books">Return Books</a></li>
                        </>
                    ) : (
                        <>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#catalog">Catalog</a></li>
                            <li><a href="#my-books">My Books</a></li>
                        </>
                    )}
                    <li><a href="#logout">Logout</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar bg-base-100">
            <div className="w-10/12 mx-auto flex justify-between items-center">
                <div className="navbar-start flex items-center">
                    <div className="dropdown">
                        <button
                            onClick={toggleDropdown}
                            className="btn btn-ghost lg:hidden"
                            aria-expanded={isOpen}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </button>
                        {isOpen && (
                            <ul className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
                                <li><Link href="/"><a onClick={closeDropdown}>Beranda</a></Link></li>
                                <li>
                                    <a>Profil</a>
                                    <ul className="p-2 bg-base-100">
                                        <li><Link href="/tentang-kami"><a onClick={closeDropdown}>Tentang Kami</a></Link></li>
                                        <li><Link href="/staf-perpustakaan"><a onClick={closeDropdown}>Staf Perpustakaan</a></Link></li>
                                    </ul>
                                </li>
                                <li><Link href="/books"><a onClick={closeDropdown}>Katalog</a></Link></li>
                                <li><Link href="/pinjam-buku"><a onClick={closeDropdown}>Peminjaman Buku</a></Link></li>
                                <li><Link href="/pesan-buku"><a onClick={closeDropdown}>Pemesanan Buku</a></Link></li>
                                <li><Link href="/kontak"><a onClick={closeDropdown}>Kontak</a></Link></li>
                            </ul>
                        )}
                    </div>
                    <Link className="flex items-center" href="/">
                        <Image src="/logo.jpeg" width={55} height={55} alt="Logo" />
                        <span className="ml-2">Perpustakaan SMPN 1 Warungkiara</span>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/">Beranda</Link></li>
                        <li className="relative group">
                            <a className="cursor-pointer">Profil</a>
                            <ul className="absolute hidden group-hover:flex flex-col p-2 bg-base-100 shadow-lg z-50 mt-8 rounded-box">
                                <li><Link href="/tentang-kami">Tentang Kami</Link></li>
                                <li><Link href="/staf-perpustakaan">Staf Perpustakaan</Link></li>
                            </ul>
                        </li>
                        <li><Link href="/books">Katalog</Link></li>
                        <li><Link href="/pinjam-buku">Peminjaman Buku</Link></li>
                        <li><Link href="/pesan-buku">Pemesanan Buku</Link></li>
                        <li><Link href="/kontak">Kontak</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
