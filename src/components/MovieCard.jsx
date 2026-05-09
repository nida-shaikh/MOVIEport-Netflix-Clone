import { Link } from 'react-router-dom';
import { FiHeart, FiCheck } from 'react-icons/fi';
import { useMovieContext } from '../context/MovieContext';
import { useToast } from '../context/ToastContext'; // Toast Import

function MovieCard({ movie }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useMovieContext();
  const { addToast } = useToast(); // Toast Function
  const inList = isInWatchlist(movie.imdbID);

  const handleWatchlist = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    if (inList) {
      removeFromWatchlist(movie.imdbID);
      addToast(`Removed from Watchlist`, 'error'); // Red Toast
    } else {
      addToWatchlist(movie);
      addToast(`${movie.Title} added to Watchlist ❤️`, 'success'); // Green Toast
    }
  };

  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="relative group cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
        
        {/* Watchlist Heart Icon */}
        <button 
          onClick={handleWatchlist}
          className={`absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg ${
            inList ? 'bg-red-600 text-white opacity-100' : 'bg-black/60 text-white hover:bg-red-600'
          }`}
        >
          {inList ? <FiCheck size={14} /> : <FiHeart size={14} />}
        </button>

        {/* Movie Poster */}
        <div className="overflow-hidden rounded-lg bg-gray-800">
          <img 
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"} 
            alt={movie.Title} 
            className="w-full aspect-[2/3] object-cover group-hover:brightness-75 transition-all duration-300"
          />
        </div>
        
        {/* Text Info */}
        <div className="mt-2 px-0.5">
          <h3 className="text-white text-sm font-semibold truncate">{movie.Title}</h3>
          <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1">
            <span>{movie.Year}</span>
            <span className="text-gray-600">•</span>
            <span className="bg-gray-700/50 px-1.5 py-0.5 rounded text-[10px] text-gray-300 font-medium">K-Drama</span>
          </div>
        </div>

      </div>
    </Link>
  );
}

export default MovieCard;