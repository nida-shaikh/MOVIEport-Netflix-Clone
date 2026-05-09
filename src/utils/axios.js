import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "a5953e845be4cd1af483a46567fcfbb7", // ✅ Tumhari TMDB Key
    language: "en-US",
  },
});

export default instance;