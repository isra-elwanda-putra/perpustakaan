"use client"
import { useState } from 'react';
import InputLabelForm from '@/app/components/inputLabelForm';

export default function PeminjamanBuku() {
    const [form, setForm] = useState({
        namaLengkap: '',
        judulBuku: '',
        penulis: '',
        kelas: '',
        nomorTelepon: '',
        tanggalPeminjaman: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/peminjaman-buku', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            console.log(res);
            if (!res.ok) {
                const errorText = await res.text();
                console.error('Error:', errorText);
                alert(`Gagal mengirim pesan: ${errorText}`);
            } else {
                alert('Pesan berhasil dikirim');
                // Reset form
                setForm({
                    namaLengkap: '',
                    judulBuku: '',
                    penulis: '',
                    kelas: '',
                    nomorTelepon: '',
                    tanggalPeminjaman: '',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mengirim pesan');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-semibold mb-6">Formulir Peminjaman Buku</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputLabelForm
                    propidname="namaLengkap"
                    proplabelplaceholder="Nama Lengkap"
                    value={form.namaLengkap}
                    e={handleChange}
                    required
                />
                <InputLabelForm
                    propidname="judulBuku"
                    proplabelplaceholder="Judul Buku"
                    value={form.judulBuku}
                    e={handleChange}
                    required
                />
                <InputLabelForm
                    propidname="penulis"
                    proplabelplaceholder="Penulis"
                    value={form.penulis}
                    e={handleChange}
                    required
                />
                <InputLabelForm
                    propidname="kelas"
                    proplabelplaceholder="Kelas"
                    value={form.kelas}
                    e={handleChange}
                    required
                />
                <InputLabelForm
                    propidname="nomorTelepon"
                    proplabelplaceholder="Nomor HP"
                    value={form.nomorTelepon}
                    e={handleChange}
                    required
                />
                <InputLabelForm
                    propidname="tanggalPeminjaman"
                    proplabelplaceholder="Tanggal Peminjaman"
                    type='date'
                    value={form.tanggalPeminjaman}
                    e={handleChange}
                    required
                />
                <button type="submit" className="btn btn-primary w-full">
                    Pinjam
                </button>
            </form>
        </div>
    );
}
