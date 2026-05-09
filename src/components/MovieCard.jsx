import { Link } from 'react-router-dom';
import { FiHeart, FiCheck, FiFilm } from 'react-icons/fi';
import { useMovieContext } from '../context/MovieContext';
import { useToast } from '../context/ToastContext';

function MovieCard({ movie }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useMovieContext();
  const { addToast } = useToast();
  const inList = isInWatchlist(movie.imdbID);

  const handleWatchlist = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    if (inList) {
      removeFromWatchlist(movie.imdbID);
      addToast(`Removed from Watchlist`, 'error');
    } else {
      addToWatchlist(movie);
      addToast(`${movie.Title} added to Watchlist ❤️`, 'success');
    }
  };

  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="relative group cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
        
        <button 
          onClick={handleWatchlist}
          className={`absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg ${
            inList ? 'bg-red-600 text-white opacity-100' : 'bg-black/60 text-white hover:bg-red-600'
          }`}
        >
          {inList ? <FiCheck size={14} /> : <FiHeart size={14} />}
        </button>

        {/* ✅ CONDITION: Poster hai toh dikhao, nahi toh CINEMATIC PLACEHOLDER dikhao */}
        {movie.Poster !== "N/A" ? (
          <div className="overflow-hidden rounded-lg bg-gray-800">
            <img 
              src={movie.Poster} 
              alt={movie.Title} 
              className="w-full aspect-[2/3] object-cover group-hover:brightness-75 transition-all duration-300"
            />
          </div>
        ) : (
          <div className="w-full aspect-[2/3] bg-gradient-to-br from-red-900/30 via-gray-900 to-gray-800 rounded-lg flex flex-col items-center justify-center p-4 border border-gray-700 group-hover:border-red-600/50 transition-all relative overflow-hidden">
            
            {/* Background mein Movie ka pehla bada letter (Watermark) */}
            <span className="text-[120px] font-bold text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-logo">
              {movie.Title ? movie.Title[0].toUpperCase() : '?'}
            </span>
            
            {/* Icon aur Text */}
            <FiFilm className="text-3xl mb-2 text-red-500/70 z-10" />
            <p className="text-xs text-center font-semibold text-gray-300 z-10 line-clamp-2 px-2">{movie.Title}</p>
            <p className="text-[10px] text-gray-500 mt-1 z-10">Poster N/A</p>
          </div>
        )}
        
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