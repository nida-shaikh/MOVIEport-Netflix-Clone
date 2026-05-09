import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.omdbapi.com/", // ✅ YAHAN 's' ADD KARO
  params: {
    apikey: "cb2b99f5", 
    type: "series",
  },
});

export default instance;