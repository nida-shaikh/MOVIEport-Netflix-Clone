import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import HeroSection from '../components/HeroSection';
import MovieRow from '../components/MovieRow';
import MovieCard from '../components/MovieCard'; // Ye path fix kar diya hai
import SkeletonCard from '../components/SkeletonCard'; // Skeleton bhi import kiya
import { FiLoader } from 'react-icons/fi';

function Home({ searchQuery }) {
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false); // Naya search hone pe skeleton dikhane ke liye
  const [loadingMore, setLoadingMore] = useState(false); // Load more button ke liye

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
      
      const response = await axios.get('', {
        params: { s: searchQuery, page: pageNum }
      });
      
      let fetchedMovies = response.data.Search || [];
      setTotalResults(parseInt(response.data.totalResults || 0));

      // Filter: Posterless aur Duplicate hata do
      const uniqueMovies = [];
      const seenIds = new Set();
      
      fetchedMovies.forEach((movie) => {
        if (movie.Poster !== "N/A" && !seenIds.has(movie.imdbID)) {
          uniqueMovies.push(movie);
          seenIds.add(movie.imdbID);
        }
      });

      if (isNewSearch) {
        setSearchResults(uniqueMovies);
      } else {
        setSearchResults((prev) => [...prev, ...uniqueMovies]);
      }

    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      // Finally block mein dono loading states false kar denge
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
      
      {/* Agar User ne search kiya hai */}
      {searchQuery ? (
        <div className="pt-8 px-6 md:px-12 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Search results for: <span className="text-red-500">"{searchQuery}"</span>
            {totalResults > 0 && (
              <span className="text-sm text-gray-400 ml-3">({totalResults} results found)</span>
            )}
          </h2>
          
          {/* Agar pehli baar load ho raha hai toh Skeleton dikhao */}
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
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </div>

              {/* LOAD MORE BUTTON */}
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
        /* Normal Home Page */
        <>
          <HeroSection />
          <div className="-mt-12 relative z-10 space-y-10 pb-10">
            <MovieRow title="🔥 Trending K-Dramas" fetchUrl="Squid Game" />
            <MovieRow title="💼 Mafia & Action" fetchUrl="Vincenzo" />
            <MovieRow title="💖 Romantic K-Dramas" fetchUrl="Crash Landing" />
            <MovieRow title="🧟 Thriller & Mystery" fetchUrl="Signal" />
            <MovieRow title="👻 Supernatural" fetchUrl="Goblin" />
            <MovieRow title="😂 Comedy Series" fetchUrl="Weightlifting Fairy" />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;