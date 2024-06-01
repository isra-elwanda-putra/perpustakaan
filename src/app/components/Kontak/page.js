"use client"
import Link from 'next/link';
import { useState } from 'react';

const AddressCard = () => {
    const [kontakCardForm, setkontakCardForm] = useState({ bookId: '', borrowerName: '', borrowDate: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/kontak', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            alert('Pesan berhasil dikirim');
        }
    };
    return (
        <div className="card bg-base-100 shadow-xl m-4 p-4">
            <h2 className="card-title text-2xl font-semibold mb-6">Hubungi Kami</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        id="namaLengkap"
                        name="namaLengkap"
                        type="text"
                        placeholder="Nama Lengkap (Wajib Diisi)"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email (Wajib Diisi)"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        id="nomorTelepon"
                        name="nomorTelepon"
                        type="text"
                        placeholder="Nomor HP (Opsional)"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <textarea
                        id="pesan"
                        name="pesan"
                        placeholder="Pesan (Wajib Diisi)"
                        className="textarea textarea-bordered textarea-md w-full h-72"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                    Pesan
                </button>
            </form>
        </div >
    );
};

const AlamatCard = () => {
    return (
        <div className="card bg-base-100 shadow-xl m-4 p-4">
            <h2 className="card-title">Alamat</h2>
            <p>Perpustakaan SMPN 1 Warungkiara <br />Jl. Raya No.123, Warungkiara, Sukabumi, Jawa Barat, Indonesia<br /></p>
        </div>
    );
};
const KontakCard = () => {
    return (
        <div className="card bg-base-100 shadow-xl m-4 p-4">
            <h2 className="card-title">Kontak</h2>
            <p>Telepon: (0266) 123-4567</p>
        </div>
    );
};


export { KontakCard, AlamatCard, AddressCard };
