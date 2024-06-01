"use client"
import React, { useState } from 'react';

const ReturnBook = () => {
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [books, setBooks] = useState([
        { id: 1, namaLengkap: 'Rizki', judulBuku: 'Chloe, Queen of Denial', penulis: 'Naomi Nash', kelas: '7', nomorTelepon: '082119726935', pinjamDate: '2024-05-25', returnDate: '2024-05-30', status: 'Pengembalian' },
        { id: 2, namaLengkap: 'Sasa', judulBuku: 'Ayo Yasinan', penulis: 'Nur Faizin Muhith', kelas: '8', nomorTelepon: '082119726936', pinjamDate: '2024-05-24', returnDate: '2024-05-29', status: 'Pengembalian' },
        { id: 3, namaLengkap: 'Sisi', judulBuku: '4G Guru Gaul Guru Galau', penulis: 'Dedew', kelas: '9', nomorTelepon: '082119726937', pinjamDate: '2024-05-23', returnDate: '2024-05-28', status: 'Pengembalian' },
    ]);
    // useEffect(() => {
    //     const fetchBooks = async () => {
    //         try {
    //             // const res = await fetch('https://localhost:5000/api/borrow', {
    //             //     method: 'GET',
    //             //     headers: { 'Content-Type': 'application/json' },
    //             // });
    //             setBooks(res);
    //             setLoading(false);
    //         } catch (error) {
    //             setError(error.message);
    //             setLoading(false);
    //         }
    //     };
    //     fetchBooks();
    // }, []);

    // if (loading) {
    //     return <div className="container mx-auto p-4">Loading...</div>;
    // }

    // if (error) {
    //     return <div className="container mx-auto p-4">Error: {error}</div>;
    // }

    return (
        <div className="container w-10/12 mx-auto p-4">
            <div className="bg-base-200 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Daftar Pengembalian Buku</h2>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Nama Lengkap</th>
                            <th>Judul Buku</th>
                            <th>Penulis</th>
                            <th>Kelas</th>
                            <th>Nomor HP</th>
                            <th>Tanggal Peminjaman</th>
                            <th>Tanggal Pengembalian</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.namaLengkap}</td>
                                <td>{book.judulBuku}</td>
                                <td>{book.penulis}</td>
                                <td>{book.kelas}</td>
                                <td>{book.nomorTelepon}</td>
                                <td>{book.pinjamDate}</td>
                                <td>{book.returnDate}</td>
                                <td>{book.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReturnBook;
