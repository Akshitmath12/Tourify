import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Tourify
        </Link>

        <div className="flex items-center gap-6">
          {!user ? (
            <>
              <Link to="/login" className="text-gray-600 hover:text-black">
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-black font-medium"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
