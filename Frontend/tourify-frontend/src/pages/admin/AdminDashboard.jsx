import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link to="/admin/tours" className="p-6 bg-white shadow rounded-lg hover:shadow-lg">
          <h2 className="text-xl font-semibold">Manage Tours</h2>
          <p className="text-gray-600">Create, edit, delete tours</p>
        </Link>

        <Link to="/admin/users" className="p-6 bg-white shadow rounded-lg hover:shadow-lg">
          <h2 className="text-xl font-semibold">Manage Users</h2>
          <p className="text-gray-600">View & delete users</p>
        </Link>

        <Link to="/admin/reviews" className="p-6 bg-white shadow rounded-lg hover:shadow-lg">
          <h2 className="text-xl font-semibold">Manage Reviews</h2>
          <p className="text-gray-600">View & delete reviews</p>
        </Link>
      </div>
    </div>
  );
}
