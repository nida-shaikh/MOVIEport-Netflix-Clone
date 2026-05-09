import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import HeroSection from '../components/HeroSection';
import MovieRow from '../components/MovieRow';
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/SkeletonCard';
import { FiLoader } from 'react-icons/fi';

function Home({ searchQuery }) {
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      setPage(1);
      fetchSearchResults(1, true);
    } else {
      setSearchResults([]);
      setTotalResults(0);
    }
  }, [searchQuery]);

  const fetchSearchResults = async (pageNum, isNewSearch) => {
    try {
      if (isNewSearch) setLoading(true); 
      else setLoadingMore(true);
      
      // ✅ TMDB Search Endpoint
      const response = await axios.get('/search/multi', {
        params: { query: searchQuery, page: pageNum }
      });
      
      let fetchedMovies = response.data.results || [];
      setTotalResults(parseInt(response.data.total_results || 0));

      // ✅ Filter: TMDB sometimes returns 'person', we only want movies/tv
      const filteredMovies = fetchedMovies.filter(movie => movie.media_type !== "person");

      if (isNewSearch) {
        setSearchResults(filteredMovies);
      } else {
        setSearchResults((prev) => [...prev, ...filteredMovies]);
      }

    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchSearchResults(nextPage, false);
  };

  const hasMore = searchResults.length < totalResults;

  return (
    <div className="min-h-screen pb-10">
      
      {searchQuery ? (
        <div className="pt-20 md:pt-8 px-4 md:px-12 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Search results for: <span className="text-red-500">"{searchQuery}"</span>
            {totalResults > 0 && (
              <span className="text-sm text-gray-400 ml-3">({totalResults} results found)</span>
            )}
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {searchResults.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-10">
                  <button 
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full flex items-center gap-2 transition-colors shadow-lg shadow-red-900/30 disabled:opacity-50"
                  >
                    {loadingMore ? (
                      <>
                        <FiLoader className="animate-spin" /> Loading...
                      </>
                    ) : (
                      "Load More Movies"
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center mt-20">
              <p className="text-5xl mb-4">🎬</p>
              <p className="text-xl text-gray-400">No series found. Try another search!</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <HeroSection />
          <div className="-mt-12 relative z-10 space-y-10 pb-10">
            {/* ✅ TMDB Categories (Unlimited & Fast) */}
            <MovieRow title="🔥 Trending Now" fetchUrl="/trending/all/week" />
            <MovieRow title="🎬 Top Rated Movies" fetchUrl="/movie/top_rated" />
            <MovieRow title="📺 Popular TV Shows" fetchUrl="/tv/popular" />
            <MovieRow title="💥 Action Packed" fetchUrl="/discover/movie?with_genres=28" />
            <MovieRow title="😂 Comedy" fetchUrl="/discover/movie?with_genres=35" />
            <MovieRow title="💕 Romance" fetchUrl="/discover/movie?with_genres=10749" />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;