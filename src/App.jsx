import { useState, lazy, Suspense } from "react"; // lazy aur Suspense import kiya
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import { ToastProvider } from "./context/ToastContext";
import Sidebar from "./components/Sidebar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import ToastContainer from "./components/ToastContainer";

// 🔥 LAZY LOADING: Ab ye pages sirf tab download honge jab unpe click hoga
const Home = lazy(() => import("./pages/Home"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const Watchlist = lazy(() => import("./pages/Watchlist"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TvShows = lazy(() => import("./pages/TvShows"));

// Loading Spinner Component (Jab naya page load ho raha hoga)
function PageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 mb-4"></div>
      <p className="text-gray-400 text-sm tracking-wider">Loading...</p>
    </div>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <BrowserRouter>
      <ToastProvider>
        <MovieProvider>
          <ScrollToTop />
          <Sidebar setSearchQuery={setSearchQuery} />
          {/* pt-16 mobile top bar ke liye, md:pt-0 desktop sidebar ke liye */}
          <main className="md:ml-[240px] min-h-screen bg-[#141414] flex flex-col pt-16 md:pt-0">
            <div className="flex-1">
              {/* Suspense mein wrap kiya taaki load hote waqt PageLoader dikhe */}
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route
                    path="/"
                    element={<Home searchQuery={searchQuery} />}
                  />
                  <Route path="/tv-shows" element={<TvShows />} />{" "}
                  {/* 👈 Naya Route */}
                  <Route path="/movie/:id" element={<MovieDetail />} />
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
            <Footer />
          </main>

          <ToastContainer />
        </MovieProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
