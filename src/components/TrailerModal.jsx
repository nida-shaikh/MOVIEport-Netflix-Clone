import { FiX, FiPlay, FiExternalLink } from 'react-icons/fi';

function TrailerModal({ movieTitle, moviePoster, onClose }) {
  const searchQuery = `${movieTitle} Official Trailer`;
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;

  return (
    // Background overlay
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={onClose}>
      
      {/* Modal Box - Mobile responsive width */}
      <div 
        className="relative w-full max-w-md sm:max-w-4xl aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Thora bada kar diya mobile pe click ke liye */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-50 bg-black/70 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
        >
          <FiX className="text-xl sm:text-2xl" />
        </button>

        {/* Background Poster (Blurred) */}
        <div className="absolute inset-0 opacity-30 blur-md">
          <img 
            src={moviePoster !== "N/A" ? moviePoster : ""} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center flex flex-col items-center gap-4 sm:gap-6 p-6 sm:p-8">
          
          {/* Play Button - Size adjust kiya */}
          <a 
            href={youtubeSearchUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-16 h-16 sm:w-24 sm:h-24 bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-600/50 hover:scale-110 transition-transform cursor-pointer"
          >
            <FiPlay className="text-white text-3xl sm:text-5xl ml-1 sm:ml-2" />
          </a>

          {/* Title - Size adjust kiya mobile ke liye */}
          <h3 className="text-white text-xl sm:text-3xl font-bold font-logo tracking-wide drop-shadow-lg">
            {movieTitle}
          </h3>
          
          <p className="text-gray-400 text-xs sm:text-sm">Trailer is available on YouTube</p>

          {/* YouTube Redirect Button */}
          <a 
            href={youtubeSearchUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-black font-bold px-6 sm:px-8 py-2 sm:py-3 rounded flex items-center gap-2 hover:bg-gray-200 transition shadow-lg text-sm sm:text-base"
          >
            <FiExternalLink /> Watch Trailer
          </a>
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;