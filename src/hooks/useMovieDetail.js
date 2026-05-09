import { useState, useEffect } from 'react';
import axios from '../utils/axios';

export const useMovieDetail = (id) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get('', {
          params: { i: id, plot: 'full' }
        });
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching details:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetail();
    }
  }, [id]);

  return { movie, loading };
};