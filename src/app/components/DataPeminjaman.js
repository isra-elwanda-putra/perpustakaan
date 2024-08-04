"use client"
import { useState, useEffect } from 'react';
import ModalPeminjamanBuku from '@/app/components/ModalPeminjamanBuku';

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date';
    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(date);
};

const ReturnBook = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [books, setBooks] = useState([]);
    const [initialData, setInitialData] = useState({});
    const [selectedBookId, setSelectedBookId] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch('/api/peminjaman-buku', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }
                const dataResponse = await res.json();
                setBooks(dataResponse.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/peminjaman-buku/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) {
                throw new Error('Failed to delete the book');
            }
            const result = await res.json();
            if (result.success) {
                setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error deleting the book:', error);
        }
    };

    const handleUbah = async (id) => {
        setSelectedBookId(id);
        document.getElementById('my_modal_5').showModal();
        try {
            const res = await fetch(`/api/peminjaman-buku/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) {
                throw new Error('Failed to fetch book data');
            }
            const result = await res.json();
            setInitialData(result.data);
        } catch (error) {
            console.error('Error fetching book data:', error);
        }
    };

    if (loading) {
        return <div className="container mx-auto p-4">Loading...</div>;
    }

    if (error) {
        return <div className="container mx-auto p-4">Error: {error}</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Daftar Pengembalian Buku</h2>
            <div className="overflow-x-auto">
                <table className="table">
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
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book._id}>
                                <td>
                                    <div>
                                        <div className="font-bold">{book.namaLengkap}</div>
                                    </div>
                                </td>
                                <td>{book.judulBuku}</td>
                                <td>{book.penulis}</td>
                                <td>{book.kelas}</td>
                                <td>{book.nomorTelepon}</td>
                                <td>{formatDate(book.tanggalPeminjaman)}</td>
                                <td>{formatDate(book.tanggalPengembalian)}</td>
                                <td>{book.status}</td>
                                <td>
                                    <button className="btn btn-primary btn-xs items-center space-x-1"
                                        onClick={() => handleUbah(book._id)}>
                                        <span className="text-white">Ubah</span>
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-error btn-xs items-center space-x-1"
                                        onClick={() => handleDelete(book._id)}>
                                        <span className="text-white">Hapus</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalPeminjamanBuku id={selectedBookId} initialData={initialData} setBooks={setBooks} />
        </div>
    );
};

export default ReturnBook;
