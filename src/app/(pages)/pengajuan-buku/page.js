"use client"
import { useState } from 'react';
import InputLabelForm from '@/app/components/inputLabelForm';

const PengajuanBuku = () => {
    const [form, setForm] = useState({
        namaLengkap: '',
        kelas: '',
        judulBuku: '',
        penulis: '',
        alasanPengajuan: '',
        tanggalPengajuan: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/pengajuan-buku', {
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
                    kelas: '',
                    judulBuku: '',
                    penulis: '',
                    alasanPengajuan: '',
                    tanggalPengajuan: '',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mengirim pesan');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-semibold mb-6">Formulir Pengajuan Buku</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputLabelForm
                    propidname="namaLengkap"
                    proplabelplaceholder="Nama Lengkap"
                    value={form.namaLengkap}
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
                    propidname="alasanPengajuan"
                    proplabelplaceholder="Alasan Pengajuan..."
                    value={form.alasanPengajuan}
                    e={handleChange}
                    required
                />
                <InputLabelForm
                    propidname="tanggalPengajuan"
                    type='date'
                    proplabelplaceholder="Tanggal Pengajuan"
                    value={form.tanggalPengajuan}
                    e={handleChange}
                    required
                />
                <button type="submit" className="btn btn-primary w-full">
                    Ajukan
                </button>
            </form>
        </div>
    );
}
export default PengajuanBuku