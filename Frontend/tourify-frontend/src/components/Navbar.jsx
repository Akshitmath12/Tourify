import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Tourify
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/tours" className="text-gray-700 hover:text-indigo-600">
            Tours
          </Link>

          <Link to="/login" className="text-gray-700 hover:text-indigo-600">
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}
