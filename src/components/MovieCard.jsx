import { Link } from 'react-router-dom';
import { FiHeart, FiCheck } from 'react-icons/fi';
import { useMovieContext } from '../context/MovieContext';
import { useToast } from '../context/ToastContext';

function MovieCard({ movie }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useMovieContext();
  const { addToast } = useToast();
  const inList = isInWatchlist(movie.id);

  const handleWatchlist = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    if (inList) {
      removeFromWatchlist(movie.id);
      addToast(`Removed from Watchlist`, 'error');
    } else {
      addToWatchlist(movie);
      addToast(`${movie.title || movie.name} added to Watchlist ❤️`, 'success');
    }
  };

  const mediaType = movie.media_type || (movie.name ? "tv" : "movie");
  const releaseYear = (movie.release_date || movie.first_air_date || "").split("-")[0];

  const posterSrc = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : "https://via.placeholder.com/300x450/1a1a1a/ffffff?text=No+Poster";

  return (
    <Link to={`/movie/${movie.id}`}>
      {/* ✅ Uiverse Card Container */}
      <div className="relative w-full aspect-[2/3] rounded-[14px] z-10 overflow-hidden flex flex-col items-center justify-center shadow-[20px_20px_60px_#000,-20px_-20px_60px_#111] group cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
        
        {/* ✅ Animated Red Blob */}
        <div className="blob absolute z-[1] top-1/2 left-1/2 w-[60%] h-[50%] rounded-full bg-red-600 opacity-80 blur-[12px] animate-blob-bounce"></div>

        {/* ✅ Glass Background + Movie Data */}
        <div className="absolute inset-[4px] z-[2] bg-[rgba(20,20,20,0.85)] backdrop-blur-[24px] rounded-[10px] overflow-hidden outline outline-2 outline-white/10 flex flex-col">
          
          {/* Watchlist Button */}
          <button 
            onClick={handleWatchlist}
            className={`absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg ${
              inList ? 'bg-red-600 text-white opacity-100' : 'bg-black/60 text-white hover:bg-red-600'
            }`}
          >
            {inList ? <FiCheck size={14} /> : <FiHeart size={14} />}
          </button>

          {/* Movie Poster (Takes 75% of the glass area) */}
          <div className="w-full h-[75%] overflow-hidden">
            <img 
              src={posterSrc} 
              alt={movie.title || movie.name} 
              className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
            />
          </div>
          
          {/* Movie Text (Takes 25% of the glass area) */}
          <div className="p-2 flex-1 flex flex-col justify-center">
            <h3 className="text-white text-sm font-semibold truncate">{movie.title || movie.name}</h3>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1">
              {releaseYear && (
                <>
                  <span>{releaseYear}</span>
                  <span className="text-gray-600">•</span>
                </>
              )}
              <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-gray-300 font-medium">
                {mediaType === "tv" ? "TV" : "Movie"}
              </span>
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
}

export default MovieCard;