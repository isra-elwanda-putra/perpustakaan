"use client"
import { useState } from 'react';

export default function PesanBuku() {
    const [form, setForm] = useState({ bookId: '', borrowerName: '', borrowDate: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/borrow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            alert('Peminjaman berhasil dicatat');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-semibold mb-6">Formulir Pengajuan Buku</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="bookId" className="block text-sm font-medium text-gray-700">
                        Nama Lengkap
                    </label>
                    <input
                        id="bookId"
                        name="bookId"
                        type="text"
                        placeholder="Nama Lengkap"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="bookId" className="block text-sm font-medium text-gray-700">
                        Kelas
                    </label>
                    <input
                        id="bookId"
                        name="bookId"
                        type="text"
                        placeholder="Kelas"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="bookId" className="block text-sm font-medium text-gray-700">
                        Judul Buku
                    </label>
                    <input
                        id="bookId"
                        name="bookId"
                        type="text"
                        placeholder="Judul Buku"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="borrowerName" className="block text-sm font-medium text-gray-700">
                        Penulis
                    </label>
                    <input
                        id="borrowerName"
                        name="borrowerName"
                        type="text"
                        placeholder="Penulis"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="borrowerName" className="block text-sm font-medium text-gray-700">
                        Alasan Pengajuan
                    </label>
                    <input
                        id="borrowerName"
                        name="borrowerName"
                        type="text"
                        placeholder="Alasan Pengajuan..."
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="borrowDate" className="block text-sm font-medium text-gray-700">
                        Tanggal Pengajuan
                    </label>
                    <input
                        id="borrowDate"
                        name="borrowDate"
                        type="date"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                    Ajukan
                </button>
            </form>
        </div>
    );
}
