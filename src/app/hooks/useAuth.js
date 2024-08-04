// app/hooks/useAuth.js
"use client";
import { useEffect, useState } from 'react';

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(token !== null);
    }, []);

    return isLoggedIn;
};

export default useAuth;
