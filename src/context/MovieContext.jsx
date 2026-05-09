import { createContext, useState, useEffect, useContext } from 'react';

const MovieContext = createContext();

// Custom hook - context ko use karne ke liye
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  // LocalStorage se purana data lo, naya hai toh empty array rakho
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('movieport-watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Jab bhi watchlist change ho, LocalStorage update karo
  useEffect(() => {
    localStorage.setItem('movieport-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Watchlist mein movie add karo
  const addToWatchlist = (movie) => {
    if (!watchlist.find((m) => m.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  // Watchlist se movie hatao
  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((m) => m.imdbID !== id));
  };

  // Check karo movie watchlist mein hai ya nahi
  const isInWatchlist = (id) => {
    return watchlist.some((m) => m.imdbID === id);
  };

  return (
    <MovieContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </MovieContext.Provider>
  );
};