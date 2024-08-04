"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar sticky top-0 w-full z-50 transition-colors duration-300 ${scrolled ? 'bg-base-100 shadow-lg' : 'bg-transparent'}`}>
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
                                <li><Link href="/" onClick={closeDropdown}>Beranda</Link></li>
                                <li>
                                    <details close>
                                        <summary>Profil</summary>
                                        <ul className="p-2 bg-base-100">
                                            <li><Link href="/tentang-kami" onClick={closeDropdown}>Tentang Kami</Link></li>
                                            <li><Link href="/staf-kami" onClick={closeDropdown}>Staf Kami</Link></li>
                                        </ul>
                                    </details>
                                </li>
                                <li><Link href="/katalog" onClick={closeDropdown}>Katalog</Link></li>
                                <li><Link href="/peminjaman-buku" onClick={closeDropdown}>Peminjaman Buku</Link></li>
                                <li><Link href="/pengajuan-buku" onClick={closeDropdown}>Pengajuan Buku</Link></li>
                                <li><Link href="/kontak" onClick={closeDropdown}>Kontak</Link></li>
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
                        <li>
                            <details close>
                                <summary>Profil</summary>
                                <ul className="p-2 bg-base-100 shadow-lg z-50 rounded-box">
                                    <li><Link href="/tentang-kami">Tentang Kami</Link></li>
                                    <li><Link href="/staf-kami">Staf Kami</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li><Link href="/katalog">Katalog</Link></li>
                        <li><Link href="/peminjaman-buku">Peminjaman Buku</Link></li>
                        <li><Link href="/pengajuan-buku">Pengajuan Buku</Link></li>
                        <li><Link href="/kontak">Kontak</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
