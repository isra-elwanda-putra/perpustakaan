"use client"
import { useState, useEffect } from 'react';
import InputLabelForm from './inputLabelForm';

const ModalBuku = ({ id, initialData, setCards }) => {
    const [form, setForm] = useState({
        judulBuku: '',
        image: '',
        penulis: ''
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
        if (!id) {
            alert('ID buku tidak tersedia');
            return;
        }
        try {
            const res = await fetch(`/api/book/${id}`, {
                method: 'PUT',
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
                setCards((prevBooks) => prevBooks.map((book) => book._id === id ? result.data : book));
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
                <h3 className="font-bold text-lg">Edit Data Buku</h3>
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
                        <button type="button" className="btn" onClick={() => document.getElementById('my_modal_5').close()}>
                            Close
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default ModalBuku;
