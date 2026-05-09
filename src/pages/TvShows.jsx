import MovieRow from '../components/MovieRow';

function TvShows() {
  return (
    <div className="min-h-screen pt-20 md:pt-8 pb-10 px-4 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">📺 TV Shows</h1>
      
      <div className="space-y-10">
        {/* ✅ TMDB TV Show Endpoints */}
        <MovieRow title="🏆 Top Rated TV Shows" fetchUrl="/tv/top_rated" />
        <MovieRow title="📺 Airing Today" fetchUrl="/tv/airing_today" />
        <MovieRow title="😂 Comedy TV" fetchUrl="/discover/tv?with_genres=35" />
        <MovieRow title="🔪 Crime & Thriller TV" fetchUrl="/discover/tv?with_genres=80" />
        <MovieRow title="🧛 Sci-Fi & Fantasy" fetchUrl="/discover/tv?with_genres=10765" />
        <MovieRow title="🎭 Drama Series" fetchUrl="/discover/tv?with_genres=18" />
      </div>
    </div>
  );
}

export default TvShows;