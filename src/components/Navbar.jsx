import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiBell, FiX, FiChevronDown, FiLogIn } from 'react-icons/fi'; // FiLogIn add kiya
import { useDebounce } from '../hooks/useDebounce';

function Navbar({ setSearchQuery }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#141414]/95 backdrop-blur-lg shadow-lg shadow-black/20' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Side - Logo & Links */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-4xl md:text-5xl font-bold font-logo tracking-widest cursor-pointer">
                <span className="text-red-600 drop-shadow-[0_0_15px_rgba(255,0,0,0.6)]">MOVIE</span>
                <span className="text-white">port</span>
              </h1>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-white font-semibold text-sm tracking-wide relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/watchlist" className="text-gray-300 font-medium text-sm tracking-wide hover:text-white transition-colors relative group">
                K-Drama List
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>

          {/* Right Side - Search, Login & Profile */}
          <div className="flex items-center gap-4">
            
            {/* BADA Search Box - Pill Shaped Glassy */}
            <div className="relative">
              {showSearch ? (
                // Search Open State (Bohot Bada)
                <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/30 rounded-full px-5 py-2.5 shadow-xl transition-all duration-300 w-[280px] md:w-[450px] animate-fade-in">
                  <FiSearch className="text-gray-300 mr-3 text-lg" />
                  <input 
                    type="text" 
                    placeholder="Search your favorite K-Dramas..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent outline-none text-white text-base w-full placeholder-gray-400"
                    autoFocus
                  />
                  <FiX 
                    className="text-gray-300 cursor-pointer hover:text-white transition ml-2 text-lg" 
                    onClick={() => { setSearchTerm(''); setShowSearch(false); }} 
                  />
                </div>
              ) : (
                // Search Closed State (Bada Button)
                <button 
                  onClick={() => setShowSearch(true)}
                  className="flex items-center gap-2 border border-gray-600 hover:border-white bg-black/30 rounded-full px-4 py-2.5 transition text-white text-sm shadow-md"
                >
                  <FiSearch className="text-lg" />
                  <span className="hidden md:inline">Search</span>
                </button>
              )}
            </div>

            {/* Notification Bell with Dot */}
            <button className="hidden md:block p-2 rounded-full hover:bg-white/10 transition text-white text-xl relative">
              <FiBell />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>

            {/* Login Icon & Button */}
            <button className="hidden md:flex items-center gap-2 border border-red-600 hover:bg-red-600 rounded-full px-4 py-2 transition text-white text-sm font-semibold shadow-red-900/30 shadow-sm">
              <FiLogIn className="text-base" />
              <span>Login</span>
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center gap-1 cursor-pointer group">
              <div className="w-9 h-9 rounded-md bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                N
              </div>
              <FiChevronDown className="text-white text-sm hidden md:block group-hover:rotate-180 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;