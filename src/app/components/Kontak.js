"use client"
import { useState } from 'react';

const AddressCard = () => {
    const [kontakCardForm, setKontakCardForm] = useState({
        namaLengkap: '',
        email: '',
        nomorTelepon: '',
        pesan: ''
    });

    const handleChange = (e) => {
        setKontakCardForm({ ...kontakCardForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Data yang dikirim:", kontakCardForm);

        try {
            const res = await fetch('http://localhost:5000/perpus/contacts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(kontakCardForm),
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error('Error:', errorText);
                alert(`Gagal mengirim pesan: ${errorText}`);
            } else {
                alert('Pesan berhasil dikirim');
                // Reset form
                setKontakCardForm({
                    namaLengkap: '',
                    email: '',
                    nomorTelepon: '',
                    pesan: ''
                });
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mengirim pesan');
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
                        value={kontakCardForm.namaLengkap}
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
                        value={kontakCardForm.email}
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
                        value={kontakCardForm.nomorTelepon}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <textarea
                        id="pesan"
                        name="pesan"
                        placeholder="Pesan (Wajib Diisi)"
                        className="textarea textarea-bordered textarea-md w-full h-72"
                        value={kontakCardForm.pesan}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                    Kirim
                </button>
            </form>
        </div>
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