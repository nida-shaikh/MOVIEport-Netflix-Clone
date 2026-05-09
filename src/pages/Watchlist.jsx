import { useMovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import MovieCard from '../components/MovieCard'; // ✅ MovieCard reuse karenge

function Watchlist() {
  const { watchlist } = useMovieContext();

  return (
    <div className="min-h-screen pt-20 md:pt-8 px-4 md:px-12 max-w-7xl mx-auto pb-10">
      <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
        <FiHeart className="text-red-500" /> My Watchlist
      </h2>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-5xl mb-4">🍿</p>
          <p className="text-xl text-gray-400">Your watchlist is empty!</p>
          <Link to="/" className="text-red-500 hover:underline mt-4 font-medium">Browse Movies</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} /> // ✅ Simple & Clean!
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;