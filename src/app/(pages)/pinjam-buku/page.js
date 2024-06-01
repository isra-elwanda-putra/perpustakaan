"use client"
import { useState } from 'react';

export default function BorrowForm() {
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
            <h1 className="text-2xl font-semibold mb-6">Formulir Peminjaman Buku</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="borrowerName" className="block text-sm font-medium text-gray-700">
                        Nama Lengkap
                    </label>
                    <input
                        id="borrowerName"
                        name="borrowerName"
                        type="text"
                        placeholder="Nama Lengkap"
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
                        id="judulBuku"
                        name="judulBuku"
                        type="text"
                        placeholder="Judul Buku"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="bookId" className="block text-sm font-medium text-gray-700">
                        Penulis
                    </label>
                    <input
                        id="judulBuku"
                        name="judulBuku"
                        type="text"
                        placeholder="Penulis"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="borrowerName" className="block text-sm font-medium text-gray-700">
                        Kelas
                    </label>
                    <input
                        id="borrowerName"
                        name="borrowerName"
                        type="text"
                        placeholder="Kelas"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="borrowerName" className="block text-sm font-medium text-gray-700">
                        Nomor HP
                    </label>
                    <input
                        id="borrowerName"
                        name="borrowerName"
                        type="text"
                        placeholder="Nomor HP"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="borrowDate" className="block text-sm font-medium text-gray-700">
                        Tanggal Peminjaman
                    </label>
                    <input
                        id="tanggalPeminjaman"
                        name="tanggalPeminjaman"
                        type="date"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="borrowDate" className="block text-sm font-medium text-gray-700">
                        Tanggal Pengembalian
                    </label>
                    <input
                        id="tanggalPengembalian"
                        name="tanggalPengembalian"
                        type="date"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                    Pinjam
                </button>
            </form>
        </div>
    );
}
