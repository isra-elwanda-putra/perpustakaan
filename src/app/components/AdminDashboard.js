import SideBarAdmin from './SideBarAdmin';
import { useState, useEffect } from 'react';

const AdminDashboard = () => {
    const [bookCount, setBookCount] = useState(0);

    useEffect(() => {
        const fetchBookCount = async () => {
            try {
                const res = await fetch('/api/book/count');
                if (!res.ok) {
                    throw new Error('Failed to fetch book count');
                }
                const data = await res.json();
                setBookCount(data.count);
            } catch (error) {
                console.error('Error fetching book count:', error);
            }
        };

        fetchBookCount();
    }, []);

    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold mb-4">Welcome, Admin!</h1>
                <p className="mb-8">Here are some quick stats and information about the library:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="text-xl font-bold">Total Books</h2>
                        <p className="text-2xl">{bookCount}</p>
                    </div>
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="text-xl font-bold">Active Loans</h2>
                        <p className="text-2xl">567</p>
                    </div>
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="text-xl font-bold">Pending Notifications</h2>
                        <p className="text-2xl">89</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;