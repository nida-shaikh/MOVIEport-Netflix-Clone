import { useMovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';
import { FiHeart, FiTrash2 } from 'react-icons/fi';

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useMovieContext();

  return (
    <div className="min-h-screen pt-8 px-6 md:px-12 max-w-7xl mx-auto pb-10">
      <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
        <FiHeart className="text-red-500" /> My Watchlist
      </h2>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-6xl mb-4">🍿</p>
          <p className="text-xl text-gray-400">Your watchlist is empty!</p>
          <Link to="/" className="text-red-500 hover:underline mt-4 font-medium">Browse K-Dramas</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <div key={movie.imdbID} className="relative group">
              <Link to={`/movie/${movie.imdbID}`}>
                <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"} 
                    alt={movie.Title} 
                    className="w-full h-[280px] md:h-[300px] object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="p-3">
                    <h3 className="text-white font-bold text-sm truncate">{movie.Title}</h3>
                    <span className="text-gray-400 text-xs">{movie.Year}</span>
                  </div>
                </div>
              </Link>
              <button 
                onClick={() => removeFromWatchlist(movie.imdbID)}
                className="absolute top-2 right-2 bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-700 shadow-lg"
              >
                <FiTrash2 className="text-white text-sm" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;