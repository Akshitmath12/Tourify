import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          Tourify
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex space-x-6">
          <Link className="hover:text-green-600" to="/">
            Home
          </Link>
          <Link className="hover:text-green-600" to="/tours">
            Tours
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-4">
          {user ? (
            // If user logged in → Profile + Logout
            <div className="relative group">
              <button className="flex items-center space-x-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=16a34a&color=fff`}
                  alt="avatar"
                  className="w-9 h-9 rounded-full"
                />
                <span className="font-medium">{user.name}</span>
              </button>

              {/* DROPDOWN */}
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 opacity-0 group-hover:opacity-100 transition">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            // If not logged in → Login + Signup
            <>
              <Link
                to="/login"
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
