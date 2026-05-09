import { useState, useEffect, useRef } from 'react';
import axios from '../utils/axios';
import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function MovieRow({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        // ✅ Direct TMDB endpoint call (e.g., /trending/all/week)
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results || []); // ✅ TMDB uses 'results'
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchMovies();
  }, [fetchUrl]);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 800 : scrollLeft + 800;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-6 group/row relative">
      <h2 className="text-xl md:text-2xl font-bold mb-5 px-6 md:px-12 text-white tracking-wide">
        {title}
      </h2>
      
      <div className="relative">
        <button onClick={() => scroll('left')} className="absolute left-1 top-0 bottom-0 z-20 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300">
          <div className="bg-black/70 backdrop-blur-md border border-gray-500/50 hover:border-white hover:bg-black w-11 h-11 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all">
            <FiChevronLeft className="text-white text-2xl font-bold" />
          </div>
        </button>

        <div ref={rowRef} className="flex gap-5 overflow-x-auto hide-scrollbar scroll-smooth px-6 md:px-12 py-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-[160px] md:w-[180px]">
                <SkeletonCard />
              </div>
            ))
          ) : (
            movies.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-[160px] md:w-[180px]"> {/* ✅ TMDB uses 'id' */}
                <MovieCard movie={movie} />
              </div>
            ))
          )}
        </div>

        <button onClick={() => scroll('right')} className="absolute right-1 top-0 bottom-0 z-20 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300">
          <div className="bg-black/70 backdrop-blur-md border border-gray-500/50 hover:border-white hover:bg-black w-11 h-11 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all">
            <FiChevronRight className="text-white text-2xl font-bold" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default MovieRow;