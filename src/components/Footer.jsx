import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold font-logo tracking-widest mb-3">
              <span className="text-red-600">MOVIE</span><span className="text-white">port</span>
            </h2>
            <p className="text-gray-500 text-sm">Your ultimate destination for K-Dramas and Movies.</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition text-sm">Home</Link></li>
              <li><Link to="/watchlist" className="text-gray-400 hover:text-white transition text-sm">My List</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400 text-sm">Action</span></li>
              <li><span className="text-gray-400 text-sm">Romance</span></li>
              <li><span className="text-gray-400 text-sm">Thriller</span></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FiGithub /></a>
              <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FiTwitter /></a>
              <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FiInstagram /></a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-600 text-xs">
          © 2024 MOVIEport. All rights reserved. Built with React & Tailwind.
        </div>
      </div>
    </footer>
  );
}

export default Footer;