"use client"
import { useState, useEffect } from 'react';

export default function Books() {
    const [cards, setCards] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 20;

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('http://localhost:5000/perpus/books', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();
                setCards(data);
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

    return (
        <div className="container p-4 overflow-hidden w-full">
            <label className="w-10/12 mx-auto input input-bordered flex items-center gap-2 m-4">
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
            <div className="w-10/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {currentCards.map((card) => (
                    <div key={card.id} className="card w-full max-w-sm bg-base-100 shadow-xl">
                        <figure className="h-[28rem] w-full">
                            <img src={card.image} alt={card.judulBuku} className="h-full w-full object-cover" />
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
    );
}
