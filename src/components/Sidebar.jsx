import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiTv, FiFilm, FiHeart, FiDownload, FiSearch, FiX, FiLogIn, FiMenu } from 'react-icons/fi';
import { useDebounce } from '../hooks/useDebounce';
import LoginModal from './LoginModal';

function Sidebar({ setSearchQuery }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => { setSearchQuery(debouncedSearch); }, [debouncedSearch, setSearchQuery]);
  useEffect(() => { setIsMobileOpen(false); }, [location.pathname]);

  const menuItems = [
    { path: "/", icon: FiHome, label: "Home" },
    { path: "/tv-shows", icon: FiTv, label: "TV Shows" },
    { path: "/", icon: FiFilm, label: "Movies" },
    { path: "/watchlist", icon: FiHeart, label: "My List" },
  ];

  return (
    <>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {/* 📱 MOBILE TOP BAR - Logo + Hamburger (Perfect Alignment) */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black/95 backdrop-blur-md z-50 md:hidden flex items-center justify-between px-4 border-b border-gray-800">
        <button onClick={() => setIsMobileOpen(true)} className="text-white text-2xl p-1">
          <FiMenu />
        </button>
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold font-logo tracking-widest">
            <span className="text-red-600 drop-shadow-[0_0_10px_rgba(255,0,0,0.6)]">MOVIE</span>
            <span className="text-white">port</span>
          </h1>
        </Link>
        <div className="w-8"></div> {/* Spacer for center alignment */}
      </div>

      {/* 🌑 Black Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/70 z-[60] md:hidden transition-opacity" onClick={() => setIsMobileOpen(false)}></div>
      )}

      {/* 📦 Sidebar Drawer */}
      <div className={`fixed left-0 top-0 h-full w-[260px] bg-[#0a0a0a] border-r border-gray-800 z-[70] flex flex-col transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <h1 className="text-3xl font-bold font-logo tracking-widest">
              <span className="text-red-600 drop-shadow-[0_0_15px_rgba(255,0,0,0.6)]">MOVIE</span>
              <span className="text-white">port</span>
            </h1>
          </Link>
          <button onClick={() => setIsMobileOpen(false)} className="md:hidden text-gray-400 hover:text-white"><FiX size={24} /></button>
        </div>

        <div className="p-4 border-b border-gray-800">
          {showSearch ? (
            <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-3 py-2 shadow-xl animate-fade-in">
              <FiSearch className="text-gray-300 mr-2 text-lg flex-shrink-0" />
              <input type="text" placeholder="Search K-Dramas..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-transparent outline-none text-white text-sm w-full placeholder-gray-400" autoFocus />
              <FiX className="text-gray-300 cursor-pointer hover:text-white ml-1 text-lg flex-shrink-0" onClick={() => { setSearchTerm(''); setShowSearch(false); }} />
            </div>
          ) : (
            <button onClick={() => setShowSearch(true)} className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-gray-700 text-gray-300 hover:text-white transition py-2.5 px-3 rounded-xl">
              <FiSearch className="text-xl" /><span className="text-sm font-medium">Search</span>
            </button>
          )}
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-1 px-3 overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path && index === 0;
            return (
              <Link key={index} to={item.path} className={`flex items-center gap-3 py-3 px-2 rounded-lg transition-all duration-200 group ${isActive ? 'bg-red-600/10 text-red-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <item.icon className={`text-xl ${isActive ? 'text-red-500' : 'group-hover:text-white'}`} />
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && <div className="w-1 h-4 bg-red-600 rounded-full ml-auto"></div>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-3">
          <button onClick={() => setShowLogin(true)} className="w-full flex items-center gap-3 border border-red-600 hover:bg-red-600 text-white py-2.5 px-3 rounded-xl transition-colors shadow-lg shadow-red-900/20">
            <FiLogIn className="text-xl" /><span className="text-sm font-bold">Login</span>
          </button>
          <button className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-gray-700 text-gray-300 hover:text-white py-2.5 px-3 rounded-xl transition-colors">
            <FiDownload className="text-xl" /><span className="text-sm font-medium">Download App</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;