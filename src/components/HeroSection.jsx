import { useState, useEffect } from 'react';
import { FiPlay, FiInfo } from 'react-icons/fi';
import vincenzoImg from '../assets/vincenzo-banner.jpg';
import squidImg from '../assets/squid.jpg';       // ✅ Tumhari local image
import goblinImg from '../assets/goblin.jpg';     // ✅ Tumhari local image

function HeroSection() {
  const slides = [
    {
      title: "VINCENZO",
      description: "A Korean-Italian mafia lawyer gives a conglomerate a taste of its own medicine with a side of justice as he seeks revenge for his fallen family.",
      image: vincenzoImg, 
      year: "2021",
      rating: "8.4",
      season: "1 Season"
    },
    {
      title: "SQUID GAME",
      description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
      image: squidImg,    // ✅ Local image used
      year: "2021",
      rating: "8.0",
      season: "2 Seasons"
    },
    {
      title: "GOBLIN",
      description: "In his quest for a bride to end his immortal life, a 939-year-old guardian of souls meets a grim reaper and a sprightly student with a tragic past.",
      image: goblinImg,   // ✅ Local image used
      year: "2016",
      rating: "8.6",
      season: "1 Season"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const currentMovie = slides[currentSlide];

  return (
    <div className="relative w-full h-[85vh] overflow-hidden transition-all duration-1000 ease-in-out">
      
      <div 
        key={currentSlide}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-fade-in-fast"
        style={{ backgroundImage: `url(${currentMovie.image})` }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/70"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/90 via-transparent to-transparent"></div>

      <div className="absolute bottom-[15%] left-4 md:left-12 max-w-[90%] sm:max-w-xl z-10">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-logo tracking-wide mb-4 drop-shadow-lg text-white">
          {currentMovie.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm mb-4 text-gray-300">
          <span className="bg-red-600 text-white px-2 py-0.5 text-xs font-bold rounded">18+</span>
          <span>{currentMovie.year}</span>
          <span>{currentMovie.season}</span>
          <span>⭐ {currentMovie.rating}</span>
          <span className="border border-gray-400 px-1 text-xs rounded">HD</span>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-6 line-clamp-3">
          {currentMovie.description}
        </p>
        <div className="flex items-center gap-3 sm:gap-4">
          <button className="bg-white text-black font-bold px-4 sm:px-6 py-2 rounded flex items-center gap-2 hover:bg-gray-300 transition text-sm sm:text-base">
            <FiPlay /> Play
          </button>
          <button className="bg-gray-600/70 text-white font-bold px-4 sm:px-6 py-2 rounded flex items-center gap-2 hover:bg-gray-500/70 transition text-sm sm:text-base">
            <FiInfo /> More Info
          </button>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-[8%] right-4 md:right-12 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index ? 'w-6 sm:w-8 h-3 bg-red-600' : 'w-3 h-3 bg-gray-500 hover:bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;