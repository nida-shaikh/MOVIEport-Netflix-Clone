import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';

export const useMovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        let response;
        // Pehle Movie ki tarah dhundho
        try {
          response = await axios.get(`/movie/${id}`, {
            params: { append_to_response: 'credits,videos,similar' } // ✅ Credits, Trailer aur Similar movies ek hi call mein!
          });
        } catch (err) {
          // Agar movie nahi mili, toh TV show ki tarah dhundho
          response = await axios.get(`/tv/${id}`, {
            params: { append_to_response: 'credits,videos,similar' }
          });
        }
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching details:", error);
        setMovie(null);
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetail();
    }
  }, [id]);

  return { movie, loading };
};