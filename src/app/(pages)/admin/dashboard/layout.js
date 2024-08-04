"use client"
import React, { useState } from 'react';
import SideBarAdmin from "@/app/components/SideBarAdmin";
import './dashboardlayout.css';

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <section className="flex flex-col md:flex-row w-full min-h-screen">
            <button
                className="md:hidden p-4 fixed top-4 left-4 z-40 focus:outline-none"
                onClick={toggleSidebar}
            >
                <svg
                    className={`w-6 h-6 transition-transform transform ${isSidebarOpen ? 'open' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>
            <div className={`fixed inset-0 z-30 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-64`}>
                <SideBarAdmin />
            </div>
            <div>
                {children}
            </div>
        </section>
    );
};

export default DashboardLayout;