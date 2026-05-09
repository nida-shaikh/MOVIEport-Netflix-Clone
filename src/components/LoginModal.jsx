import { FiX, FiMail, FiLock } from 'react-icons/fi';

function LoginModal({ onClose }) {
  return (
    // Background Overlay
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      
      {/* Modal Box */}
      <div 
        className="relative w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-red-900/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <FiX size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-logo tracking-widest mb-2">
            <span className="text-red-600">MOVIE</span><span className="text-white">port</span>
          </h2>
          <p className="text-gray-400 text-sm">Sign in to access your watchlist</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Email Input */}
          <div className="relative">
            <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-white/5 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-white/5 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-red-900/30"
          >
            Sign In
          </button>
        </form>

        {/* Extra Options */}
        <div className="mt-6 text-center text-sm">
          <a href="#" className="text-gray-400 hover:text-red-500 transition">Forgot Password?</a>
          <p className="text-gray-500 mt-3">
            Don't have an account? <a href="#" className="text-red-500 hover:text-red-400 font-semibold transition">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;