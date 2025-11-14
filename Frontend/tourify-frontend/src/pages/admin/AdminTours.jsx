import { useEffect, useState } from "react";
import axios from "../../utils/api";
import { Link } from "react-router-dom";

export default function AdminTours() {
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    const res = await axios.get("/tours");
    setTours(res.data.data.tours);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const deleteTour = async (id) => {
    await axios.delete(`/tours/${id}`);
    fetchTours();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Tours</h1>
        <Link
          to="/admin/tours/create"
          className="px-4 py-2 bg-green-600 rounded text-white"
        >
          + Create Tour
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tours.map((tour) => (
            <tr key={tour._id} className="border-b">
              <td className="p-3">{tour.name}</td>
              <td className="p-3">${tour.price}</td>
              <td className="p-3">
                <Link
                  to={`/admin/tours/edit/${tour._id}`}
                  className="text-blue-600 mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteTour(tour._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
