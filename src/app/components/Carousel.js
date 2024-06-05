"use client"
import { useState } from 'react';
import Image from 'next/image';

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(1);
    const totalSlides = 1; // Ubah sesuai dengan jumlah slide yang tersedia

    const handleSlideChange = (slideNumber) => {
        if (slideNumber < 1) {
            setCurrentSlide(totalSlides);
        } else if (slideNumber > totalSlides) {
            setCurrentSlide(1);
        } else {
            setCurrentSlide(slideNumber);
        }
    };

    return (
        <div className="w-10/12 mx-auto my-4 flex min-h-screen flex-col items-center justify-between">
            <div className="carousel w-full overflow-hidden">
                <div id="slide1" className={`carousel-item relative w-full ${currentSlide === 1 ? 'block' : 'hidden'}`}>
                    <Image
                        src="https://i.ibb.co.com/SQSGnVB/SMPN1-Warungkiara.jpg"
                        alt="Slide 1"
                        width={1200}
                        height={800}
                        layout="responsive"
                        objectFit="cover"
                    />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a onClick={() => handleSlideChange(currentSlide - 1)} className="btn btn-circle cursor-pointer">❮</a>
                        <a onClick={() => handleSlideChange(currentSlide + 1)} className="btn btn-circle cursor-pointer">❯</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
