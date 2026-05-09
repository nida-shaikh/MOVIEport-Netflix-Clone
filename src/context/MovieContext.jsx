import { createContext, useState, useEffect, useContext } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  // ✅ SMART LOGIC: Page load hote hi purane OMDb data check karo aur hatao
  useEffect(() => {
    const saved = localStorage.getItem('movieport-watchlist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Agar data mein imdbID hai, matlab ye purana OMDb data hai, delete karo!
        if (parsed.length > 0 && parsed[0].imdbID) {
          localStorage.removeItem('movieport-watchlist');
          setWatchlist([]);
        } else {
          setWatchlist(parsed); // Naya TMDB data hai toh rakh lo
        }
      } catch (e) {
        localStorage.removeItem('movieport-watchlist'); // Corrupt data bhi hata do
      }
    }
  }, []);

  // Naye data ko save karo
  useEffect(() => {
    localStorage.setItem('movieport-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    if (!watchlist.find((m) => m.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((m) => m.id !== id));
  };

  const isInWatchlist = (id) => {
    return watchlist.some((m) => m.id === id);
  };

  return (
    <MovieContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </MovieContext.Provider>
  );
};