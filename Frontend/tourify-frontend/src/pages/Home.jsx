import { useEffect, useState } from "react";
import axios from "../utils/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    try {
      const res = await axios.get("/tours");
      setTours(res.data.data.tours);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Tours</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Link
            key={tour._id}
            to={`/tour/${tour._id}`}
            className="bg-white shadow p-4 rounded-lg hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">{tour.name}</h2>
            <p className="text-gray-600">{tour.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
