'use client'
import { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import SvgPathArrow from '@/app/components/SvgPathArrow';
import SvgDashboard from '@/app/components/SvgDashboard';
import Avatar from '@/app/components/Avatar';
import SvgPengaturan from '@/app/components/SvgManage';
import SvgManage from '@/app/components/SvgManage';
import SvgNotif from '@/app/components//SvgNotif';

const SideBarAdmin = () => {
    const [isOpenManage, setIsOpenManage] = useState(false);
    const [isOpenNotif, setIsOpenNotif] = useState(false);
    const user = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        avatarUrl: "" // Kosong untuk menggunakan inisial, atau masukkan URL gambar untuk menggunakan gambar
    };

    return (
        <aside className="w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <Link className="flex items-center" href="/">
                <Image src="/logo.jpeg" width={55} height={55} alt="Logo" />
                <span className="ml-2">Perpustakaan SMPN 1 Warungkiara</span>
            </Link>

            <div className="flex flex-col items-center mt-6 -mx-2">
                <Avatar name={user.name} avatarUrl={user.avatarUrl} />
                <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{user.name}</h4>
                <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <div className="relative">
                        <Link href="/admin/dashboard">
                            <div
                                className={`flex items-center justify-between w-full px-4 py-2 text-gray-700  rounded-lg  dark:text-gray-200 bg-white dark:bg-gray-800`}
                            >
                                <div className="flex items-center">

                                    <SvgDashboard />
                                    <span className="mx-4 font-medium">Dashboard</span>

                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setIsOpenManage(!isOpenManage)}
                            className="flex items-center justify-between w-full px-4 py-2 text-gray-700  rounded-lg  dark:text-gray-200"
                        >
                            <div className="flex items-center">
                                <SvgManage />
                                <span className="mx-4 font-medium">Manage</span>
                            </div>
                            <svg
                                className={`w-5 h-5 transform transition-transform ${isOpenManage ? 'rotate-180' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <SvgPathArrow />
                            </svg>
                        </button>

                        {isOpenManage && (
                            <div
                                className={`mt-2 w-full bg-white rounded-md shadow-xl dark:bg-gray-800`}
                            >
                                <Link href="/admin/dashboard/katalog" className="side-bar-admin-submenu">Data Buku</Link>
                                <Link href="/admin/dashboard/peminjaman" className="side-bar-admin-submenu">Data Peminjaman</Link>
                                <Link href="/admin/dashboard/pengajuan" className="side-bar-admin-submenu">Data Pengajuan</Link>
                                <Link href="/admin/dashboard/kontak" className="side-bar-admin-submenu">Data Kontak</Link>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setIsOpenNotif(!isOpenNotif)}
                            className="flex items-center justify-between w-full px-4 py-2 text-gray-700 rounded-lg dark:text-gray-200"
                        >
                            <div className="flex items-center">
                                <SvgNotif />
                                <span className="mx-4 font-medium">Notif</span>
                            </div>
                            <svg
                                className={`w-5 h-5 transform transition-transform ${isOpenNotif ? 'rotate-180' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <SvgPathArrow />
                            </svg>
                        </button>

                        {isOpenNotif && (
                            <div
                                className={`mt-2 w-full bg-white rounded-md shadow-xl dark:bg-gray-800`}
                            >
                                <Link href="/admin/dashboard/katalog" className="side-bar-admin-submenu">Kontak</Link>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <Link href="/admin/dashboard">
                            <div
                                className={`flex items-center justify-between w-full px-4 py-2 text-gray-700  rounded-lg  dark:text-gray-200 bg-white dark:bg-gray-800`}
                            >
                                <div className="flex items-center">

                                    <SvgDashboard />
                                    <span className="mx-4 font-medium">Logout</span>

                                </div>
                            </div>
                        </Link>
                    </div>
                </nav>
            </div >
        </aside >
    );
}

export default SideBarAdmin