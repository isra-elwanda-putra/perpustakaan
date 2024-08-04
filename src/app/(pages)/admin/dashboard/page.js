'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/app/components/AdminDashboard';
const useRefreshOnInteraction = () => {
    const router = useRouter();
    useEffect(() => {
        const refreshToken = async () => {
            try {
                const response = await fetch('/api/refresh-token', {
                    method: 'POST',
                    credentials: 'include'
                });

                if (response.ok) {
                    const result = await response.json();
                    sessionStorage.setItem('accessToken', result.accessToken);
                    sessionStorage.setItem('tokenExpiry', Date.now() + result.expiresIn * 1000);
                } else {
                    throw new Error('Gagal memperbarui token');
                }
            } catch (error) {
                console.error('Error refreshing token:', error);
                router.push('/admin/login');
            }
        };

        const handleInteraction = () => {
            const tokenExpiry = sessionStorage.getItem('tokenExpiry');
            if (tokenExpiry && Date.now() < tokenExpiry) {
                // Token masih valid, tidak perlu refresh
                return;
            }
            refreshToken();
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('keypress', handleInteraction);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keypress', handleInteraction);
        };
    }, [router]);
};
const DashboardPage = () => {
    useRefreshOnInteraction();
    const [data, setData] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            let accessToken = sessionStorage.getItem('accessToken');
            const tokenExpiry = sessionStorage.getItem('tokenExpiry');
            if (!accessToken || !tokenExpiry || Date.now() >= tokenExpiry) {
                // const refreshResponse = await fetch('/api/refresh-token', {
                //     method: 'POST',
                //     credentials: 'include', // Termasuk cookie
                // });

                // if (refreshResponse.ok) {
                //     const refreshData = await refreshResponse.json();
                //     accessToken = refreshData.accessToken;
                //     sessionStorage.setItem('accessToken', accessToken);
                // } else {
                //     router.push('/admin/login'); // Redirect to login if refresh token is invalid
                //     return;
                // }
                router.push('/admin/login');
                return;
            }

            try {
                const response = await fetch('/api/protected-route', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    setData(result.data);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                router.push('/admin/login');
            }
        };

        fetchData();
    }, [router]);

    if (!data) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <AdminDashboard />
        </div>
    )
}
export default DashboardPage