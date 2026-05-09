import { FiX, FiPlay, FiExternalLink } from 'react-icons/fi';

function TrailerModal({ movieTitle, moviePoster, onClose }) {
  // YouTube pe directly us movie ka trailer search karega
  const searchQuery = `${movieTitle} Official Trailer`;
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;

  return (
    // Background overlay - click karke band kar sakte hain
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={onClose}>
      
      {/* Modal Box */}
      <div 
        className="relative w-full max-w-4xl aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()} // Modal ke andar click karne pe band na ho
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-black/70 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
        >
          <FiX className="text-xl" />
        </button>

        {/* Background Poster (Blurred) */}
        <div className="absolute inset-0 opacity-30 blur-md">
          <img 
            src={moviePoster !== "N/A" ? moviePoster : ""} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content - Play Button & YouTube Link */}
        <div className="relative z-10 text-center flex flex-col items-center gap-6 p-8">
          
          {/* Big Play Button */}
          <a 
            href={youtubeSearchUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-600/50 hover:scale-110 transition-transform cursor-pointer"
          >
            <FiPlay className="text-white text-5xl ml-2" />
          </a>

          <h3 className="text-white text-3xl font-bold font-logo tracking-wide drop-shadow-lg">
            {movieTitle}
          </h3>
          
          <p className="text-gray-400 text-sm">Trailer is available on YouTube</p>

          {/* YouTube Redirect Button */}
          <a 
            href={youtubeSearchUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-black font-bold px-8 py-3 rounded flex items-center gap-2 hover:bg-gray-200 transition shadow-lg mt-2"
          >
            <FiExternalLink /> Watch Trailer on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;