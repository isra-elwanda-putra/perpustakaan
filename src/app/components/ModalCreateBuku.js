"use client"
import { useState, useEffect } from 'react';
import InputLabelForm from './inputLabelForm';

const ModalBuku = () => {
    const [form, setForm] = useState({
        judulBuku: '',
        image: '',
        penulis: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    console.log(form);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/book`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            console.log(res);
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText);
            }

            const result = await res.json();
            if (result.success) {
                alert('Data buku berhasil ditambahkan');
                document.getElementById('my_modal_4').close();
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error adding the book:', error);
            alert('Terjadi kesalahan saat menambah buku');
        }
    };

    return (
        <dialog id="my_modal_4" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Tambah Data Buku</h3>
                <div className="modal-action">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputLabelForm
                            propidname="judulBuku"
                            proplabelplaceholder="Judul Buku"
                            value={form.judulBuku}
                            e={handleChange}
                            required
                        />
                        <InputLabelForm
                            propidname="image"
                            proplabelplaceholder="Image"
                            value={form.image}
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
                        <button type="submit" className="btn btn-primary w-full">
                            Simpan
                        </button>
                        <button type="button" className="btn" onClick={() => document.getElementById('my_modal_4').close()}>
                            Close
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default ModalBuku;
