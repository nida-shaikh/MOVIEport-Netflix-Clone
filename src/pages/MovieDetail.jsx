import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlay, FiPlus, FiX } from 'react-icons/fi'; // FiX add kiya
import { useMovieDetail } from '../hooks/useMovieDetail';
import MovieRow from '../components/MovieRow';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, loading } = useMovieDetail(); 
  const [showTrailer, setShowTrailer] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 md:pt-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 md:pt-8 gap-4">
        <p className="text-2xl text-gray-400">Movie not found!</p>
        <button onClick={() => navigate('/')} className="bg-red-600 px-6 py-2 rounded font-bold hover:bg-red-700">Go Home</button>
      </div>
    );
  }

  // ✅ TMDB Data Extraction
  const title = movie.title || movie.name;
  const releaseYear = (movie.release_date || movie.first_air_date || "").split("-")[0];
  const genres = movie.genres?.map(g => g.name) || [];
  const cast = movie.credits?.cast?.slice(0, 5).map(c => c.name).join(", ") || "N/A";
  const director = movie.credits?.crew?.find(c => c.job === "Director")?.name || movie.created_by?.[0]?.name || "N/A";
  const rating = movie.vote_average?.toFixed(1);
  const runtime = movie.runtime ? `${movie.runtime} min` : (movie.episode_run_time?.length ? `${movie.episode_run_time[0]} min/ep` : "N/A");
  
  // ✅ YouTube Trailer Key
  const trailer = movie.videos?.results?.find(v => v.type === "Trailer" && v.site === "YouTube");
  const trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;

  // ✅ Backdrop Image (Full HD background for detail page)
  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` 
    : (movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : "");

  const mainGenre = genres[0] || "Drama";
  const mediaType = movie.title ? 'movie' : 'tv'; // Similar movies ke liye

  return (
    <div className="min-h-screen pb-10">
      
      {/* 🔥 TRAILER MODAL - Ab YouTube directly app mein play hoga! */}
      {showTrailer && trailerUrl && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setShowTrailer(false)}>
          <div className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden border border-gray-700" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowTrailer(false)} className="absolute top-3 right-3 z-50 bg-black/70 hover:bg-red-600 text-white p-2 rounded-full transition-colors">
              <FiX className="text-2xl" />
            </button>
            <iframe src={trailerUrl} title="Trailer" className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      )}

      {/* Background Image */}
      <div className="relative z-0">
        <div className="absolute inset-0 overflow-hidden h-[50vh] md:h-[80vh]">
          <img src={backdropUrl} alt="Background" className="w-full h-full object-cover opacity-30 blur-sm scale-105"/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/90 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 pt-16 md:pt-8 px-4 md:px-12 max-w-6xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-300 hover:text-white transition mb-6 md:mb-8 group">
            <FiArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform" /> <span className="font-medium">Back</span>
          </button>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/300x450/1a1a1a/ffffff?text=No+Poster"} alt={title} className="w-[180px] sm:w-[250px] md:w-[350px] rounded-lg shadow-2xl shadow-black/50 hover:scale-105 transition-transform duration-300 border-2 border-gray-800"/>
            </div>

            <div className="flex flex-col justify-center text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-logo tracking-wide text-white leading-tight mb-4">{title}</h1>

              <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 sm:gap-3 text-sm text-gray-400 mb-6">
                <span className="bg-red-600 text-white px-2 py-0.5 font-bold rounded text-xs">HD</span>
                <span>📅 {releaseYear}</span>
                <span>⏱️ {runtime}</span>
                <span className="border border-gray-600 px-2 py-0.5 rounded text-xs">⭐ {rating}/10</span>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
                {genres.map((genre) => (
                  <span key={genre} className="bg-gray-800/80 border border-gray-700 px-3 py-1 rounded-full text-sm text-gray-300 hover:border-white hover:text-white transition cursor-pointer">
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 mb-8">
                {trailerUrl && (
                  <button onClick={() => setShowTrailer(true)} className="bg-white text-black font-bold px-5 sm:px-8 py-3 rounded flex items-center gap-2 hover:bg-gray-200 transition shadow-lg text-sm sm:text-base">
                    <FiPlay className="text-xl" /> Play Trailer
                  </button>
                )}
                <button className="bg-gray-700/80 backdrop-blur-sm text-white font-bold px-4 sm:px-5 py-3 rounded flex items-center gap-2 hover:bg-gray-600/80 transition border border-gray-600">
                  <FiPlus className="text-xl" /> My List
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Storyline</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">{movie.overview}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500">Director: </span><span className="text-white font-medium">{director}</span></div>
                <div><span className="text-gray-500">Cast: </span><span className="text-white font-medium">{cast}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies Section */}
      <div className="relative z-10 mt-16 border-t border-gray-800 pt-10">
        <MovieRow title="✨ You Might Also Like" fetchUrl={`/${mediaType}/${id}/similar`} />
      </div>

    </div>
  );
}

export default MovieDetail;