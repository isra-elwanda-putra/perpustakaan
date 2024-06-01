"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Footer from "@/app/components/Footer/page";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 4; // Total number of slides

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === totalSlides ? 1 : prevSlide + 1));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSlideChange = (slideNumber) => {
    setCurrentSlide(slideNumber);
  };

  return (
    <div>
      <main className="w-10/12 mx-auto my-4 flex min-h-screen flex-col items-center justify-between">
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
              <a onClick={() => handleSlideChange(totalSlides)} className="btn btn-circle cursor-pointer">❮</a>
              <a onClick={() => handleSlideChange(2)} className="btn btn-circle cursor-pointer">❯</a>
            </div>
          </div>
          <div id="slide2" className={`carousel-item relative w-full ${currentSlide === 2 ? 'block' : 'hidden'}`}>
            <Image
              src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
              alt="Slide 2"
              width={1200}
              height={800}
              layout="responsive"
              objectFit="cover"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a onClick={() => handleSlideChange(1)} className="btn btn-circle cursor-pointer">❮</a>
              <a onClick={() => handleSlideChange(3)} className="btn btn-circle cursor-pointer">❯</a>
            </div>
          </div>
          <div id="slide3" className={`carousel-item relative w-full ${currentSlide === 3 ? 'block' : 'hidden'}`}>
            <Image
              src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
              alt="Slide 3"
              width={1200}
              height={800}
              layout="responsive"
              objectFit="cover"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a onClick={() => handleSlideChange(2)} className="btn btn-circle cursor-pointer">❮</a>
              <a onClick={() => handleSlideChange(4)} className="btn btn-circle cursor-pointer">❯</a>
            </div>
          </div>
          <div id="slide4" className={`carousel-item relative w-full ${currentSlide === 4 ? 'block' : 'hidden'}`}>
            <Image
              src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
              alt="Slide 4"
              width={1200}
              height={800}
              layout="responsive"
              objectFit="cover"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a onClick={() => handleSlideChange(3)} className="btn btn-circle cursor-pointer">❮</a>
              <a onClick={() => handleSlideChange(1)} className="btn btn-circle cursor-pointer">❯</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
