"use client"
import { useState, useEffect } from 'react';
import InputLabelForm from './inputLabelForm';

const ModalPeminjamanBuku = ({ id, initialData, setBooks }) => {
    const [form, setForm] = useState({
        namaLengkap: '',
        judulBuku: '',
        penulis: '',
        kelas: '',
        nomorTelepon: '',
        tanggalPeminjaman: '',
        tanggalPengembalian: '',
        status: '',
    });

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/peminjaman-buku/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText);
            }

            const result = await res.json();
            if (result.success) {
                setBooks((prevBooks) => prevBooks.map((book) => book._id === id ? result.data : book));
                alert('Data berhasil diperbarui');
                document.getElementById('my_modal_5').close();
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error updating the book:', error);
            alert('Terjadi kesalahan saat mengirim pesan');
        }
    };

    return (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Edit Data Peminjaman Buku</h3>
                <div className="modal-action">
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
                            value={form.tanggalPeminjaman ? form.tanggalPeminjaman.split('T')[0] : ''}
                            e={handleChange}
                            required
                        />
                        <InputLabelForm
                            propidname="tanggalPengembalian"
                            proplabelplaceholder="Tanggal Pengembalian"
                            type='date'
                            value={form.tanggalPengembalian ? form.tanggalPengembalian.split('T')[0] : ''}
                            e={handleChange}
                            required
                        />
                        <InputLabelForm
                            propidname="status"
                            proplabelplaceholder="Status"
                            value={form.status}
                            e={handleChange}
                            required
                        />
                        <button type="submit" className="btn btn-primary w-full">
                            Simpan
                        </button>
                        <button type="button" className="btn" onClick={() => document.getElementById('my_modal_5').close()}>
                            Close
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default ModalPeminjamanBuku;
