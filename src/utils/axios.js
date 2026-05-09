import axios from "axios";

const instance = axios.create({
  baseURL: "http://www.omdbapi.com/",
  params: {
    apikey: "cb2b99f5", 
    type: "series", // <-- Ye add kiya hai, ab sirf TV Series aayengi
  },
});

export default instance;