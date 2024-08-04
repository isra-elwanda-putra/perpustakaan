"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ModalBuku from '@/app/components/ModalBuku';
import ModalCreateBuku from '@/app/components/ModalCreateBuku';

export default function Book() {
    const [cards, setCards] = useState([]);
    const [initialData, setInitialData] = useState({});
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 20;

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('/api/book', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const dataResponse = await response.json();
                setCards(dataResponse.data);
            } catch (error) {
                console.error('Error fetching cards data:', error);
            }
        };

        fetchCards();
    }, []);

    const filteredCards = cards.filter(card =>
        card.judulBuku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.penulis.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

    const currentCards = filteredCards.slice(
        (currentPage - 1) * cardsPerPage,
        currentPage * cardsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to the first page on new search
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/book/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) {
                throw new Error('Failed to delete the book');
            }
            const result = await res.json();
            if (result.success) {
                setCards((prevBooks) => prevBooks.filter((book) => book._id !== id));
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error deleting the book:', error);
        }
    };

    const handleEdit = async (id) => {
        setSelectedBookId(id);
        try {
            const res = await fetch(`/api/book/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) {
                throw new Error('Failed to fetch book data');
            }
            const result = await res.json();
            setInitialData(result.data);
            document.getElementById('my_modal_5').showModal();
        } catch (error) {
            console.error('Error fetching book data:', error);
        }
    };
    const handleCreate = async () => {
        document.getElementById('my_modal_4').showModal();
    };

    return (
        <div>
            <div className="container p-4 overflow-hidden w-full">
                <div className="w-10/12 mx-auto flex items-center gap-4 my-2">
                    <label className="w-full input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                        </svg>
                    </label>
                    <button
                        onClick={() => handleCreate()}
                        className="bg-[rgba(0,0,0,0.6)] text-white border border-white rounded-full p-2 m-1 hover:bg-white hover:text-black transition duration-300"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5 12H19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="w-10/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {currentCards.map((card) => (
                        <div key={card._id} className="card w-full max-w-sm bg-base-100 shadow-xl relative">
                            <figure className="h-[28rem] w-full relative">
                                <img src={card.image} alt={card.judulBuku} className="h-full w-full object-cover" />
                                <div className="absolute inset-0 flex justify-center items-center space-x-2">
                                    <button
                                        onClick={() => handleEdit(card._id)}
                                        className="bg-[rgba(0,0,0,0.6)] text-white border border-white rounded-full p-2 m-1 hover:bg-white hover:text-black transition duration-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(card._id)}
                                        className="bg-[rgba(0,0,0,0.6)] text-white border border-white rounded-full p-2 m-1 hover:bg-white hover:text-black transition duration-300"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{card.judulBuku}</h2>
                                <h3 className="">{card.penulis}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="join mt-6 flex justify-center">
                    <button
                        className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        «
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={`join-item btn ${currentPage === i + 1 ? 'btn-active' : ''}`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        className={`join-item btn ${currentPage === totalPages ? 'btn-disabled' : ''}`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        »
                    </button>
                </div>
            </div>
            <ModalCreateBuku />
            <ModalBuku id={selectedBookId} initialData={initialData} setCards={setCards} />
        </div>
    );
}
