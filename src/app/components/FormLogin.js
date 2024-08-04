"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
const FormLogin = () => {
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formLogin;
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = {};
        if (!email.trim() || !emailRegex.test(email)) {
            newErrors.email = 'Invalid email address';
        }
        if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (validateForm()) {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formLogin)
                });
                if (response.ok) {
                    const result = await response.json();
                    sessionStorage.setItem('accessToken', result.accessToken);
                    sessionStorage.setItem('tokenExpiry', Date.now() + result.expiresInAccessToken * 1000);
                    router.push('/admin/dashboard');
                } else {
                    const errorData = await response.json();
                    toast.error(errorData.message || 'Login failed');
                }
            }
        } catch (error) {
            console.error('Error signing user:', error.message);
            toast.error('Terjadi kesalahan saat login. Silakan coba lagi.');
        }
        setLoading(false);
    };
    return (
        <div className="flex justify-center items-center h-screen font-primary p-10 m-2">
            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl shadow-lg p-10">
                <h1 className='font-secondary text-xl text-center font-semibold text-[#0b3a65ff]'>
                    Admin Login
                </h1>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Email</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Email"
                        className="w-full input input-bordered"
                        value={email}
                        onChange={(e) => setFormLogin({ ...formLogin, email: e.target.value })}
                    />
                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="w-full input input-bordered"
                        value={password}
                        onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })}
                    />
                    {errors.password && <span className="text-red-500">{errors.password}</span>}
                </div>
                <div>
                    <button type='submit' className="btn btn-block bg-[#0b3a65ff] text-white">
                        {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Sign In'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormLogin;