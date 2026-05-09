import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Big 404 Text */}
      <h1 className="text-8xl md:text-9xl font-bold font-logo text-red-600 mb-4 tracking-wider">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-400 mb-8 max-w-md">
        Looks like this movie got lost in the multiverse. The page you are looking for does not exist.
      </p>
      <Link 
        to="/" 
        className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded flex items-center gap-2 transition shadow-lg"
      >
        <FiHome /> Back to Home
      </Link>
    </div>
  );
}

export default NotFound;