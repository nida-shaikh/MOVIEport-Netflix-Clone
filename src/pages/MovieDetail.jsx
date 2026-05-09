import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlay, FiPlus, FiThumbsUp } from 'react-icons/fi';
import { useMovieDetail } from '../hooks/useMovieDetail';
import TrailerModal from '../components/TrailerModal';
import MovieRow from '../components/MovieRow'; // MovieRow import kiya

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, loading } = useMovieDetail(id); 
  const [showTrailer, setShowTrailer] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
      </div>
    );
  }

  if (!movie || movie.Response === "False") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-8 gap-4">
        <p className="text-2xl text-gray-400">Movie not found!</p>
        <button onClick={() => navigate('/')} className="bg-red-600 px-6 py-2 rounded font-bold hover:bg-red-700">Go Home</button>
      </div>
    );
  }

  // Movie ke genre mein se pehla genre nikal lo (jaise "Action, Crime" mein se "Action")
  const mainGenre = movie.Genre?.split(", ")[0] || "Drama";

  return (
    <div className="min-h-screen pb-10">
      
      {showTrailer && (
        <TrailerModal movieTitle={movie.Title} moviePoster={movie.Poster} onClose={() => setShowTrailer(false)} />
      )}

      {/* Background Blur Image */}
      <div className="relative z-0">
        <div className="absolute inset-0 overflow-hidden h-[80vh]">
          <img 
            src={movie.Poster} 
            alt="Background" 
            className="w-full h-full object-cover opacity-20 blur-2xl scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent"></div>
        </div>

        {/* Back Button & Content */}
        <div className="relative z-10 pt-8 px-6 md:px-12 max-w-6xl mx-auto">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-gray-300 hover:text-white transition mb-8 group"
          >
            <FiArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform" /> 
            <span className="font-medium">Back</span>
          </button>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img 
                src={movie.Poster} 
                alt={movie.Title} 
                className="w-[300px] md:w-[350px] rounded-lg shadow-2xl shadow-black/50 hover:scale-105 transition-transform duration-300 border-2 border-gray-800"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-6xl font-bold font-logo tracking-wide text-white leading-tight mb-4">
                {movie.Title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-6">
                <span className="bg-red-600 text-white px-2 py-0.5 font-bold rounded text-xs">{movie.Rated}</span>
                <span>📅 {movie.Year}</span>
                <span>⏱️ {movie.Runtime}</span>
                <span className="border border-gray-600 px-2 py-0.5 rounded text-xs">HD</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {movie.Genre?.split(", ").map((genre) => (
                  <span key={genre} className="bg-gray-800/80 border border-gray-700 px-3 py-1 rounded-full text-sm text-gray-300 hover:border-white hover:text-white transition cursor-pointer">
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={() => setShowTrailer(true)}
                  className="bg-white text-black font-bold px-8 py-3 rounded flex items-center gap-2 hover:bg-gray-200 transition shadow-lg"
                >
                  <FiPlay className="text-xl" /> Play Trailer
                </button>
                <button className="bg-gray-700/80 backdrop-blur-sm text-white font-bold px-5 py-3 rounded flex items-center gap-2 hover:bg-gray-600/80 transition border border-gray-600">
                  <FiPlus className="text-xl" /> My List
                </button>
                <button className="bg-gray-700/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-gray-600/80 transition border border-gray-600">
                  <FiThumbsUp className="text-xl" />
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Storyline</h3>
                <p className="text-gray-400 leading-relaxed text-base">{movie.Plot}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Director: </span>
                  <span className="text-white font-medium">{movie.Director}</span>
                </div>
                <div>
                  <span className="text-gray-500">Cast: </span>
                  <span className="text-white font-medium">{movie.Actors}</span>
                </div>
                <div>
                  <span className="text-gray-500">Language: </span>
                  <span className="text-white font-medium">{movie.Language}</span>
                </div>
                <div>
                  <span className="text-gray-500">Awards: </span>
                  <span className="text-white font-medium">{movie.Awards}</span>
                </div>
              </div>

              <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg inline-flex items-center gap-4">
                <div className="text-3xl font-bold text-yellow-400">⭐ {movie.imdbRating}</div>
                <div className="text-sm text-gray-300">
                  <div className="font-semibold">IMDb Rating</div>
                  <div className="text-xs text-gray-500">{movie.imdbVotes} votes</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ✨ YOU MIGHT ALSO LIKE - Similar Movies Section ✨ */}
      <div className="relative z-10 mt-16 border-t border-gray-800 pt-10">
        <MovieRow 
          title={`✨ More like "${mainGenre}"`} 
          fetchUrl={mainGenre} // Genre ko search bhej rahe hain
        />
      </div>

    </div>
  );
}

export default MovieDetail;