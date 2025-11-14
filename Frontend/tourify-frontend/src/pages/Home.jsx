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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[480px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?q=80&w=2000"
          className="h-full w-full object-cover brightness-75"
          alt="Hero"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-5xl font-extrabold drop-shadow-lg">
            Discover Your Next Adventure
          </h1>
          <p className="text-white text-lg mt-4 max-w-2xl">
            Explore the world with curated experiences, breathtaking views, and unforgettable moments.
          </p>

          <a
            href="#tours"
            className="mt-8 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
          >
            Explore Tours
          </a>
        </div>
      </section>

      {/* Tours Section */}
      <section id="tours" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Available Tours
        </h2>

        {tours.length === 0 ? (
          <p className="text-gray-600">No tours available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <Link
                key={tour._id}
                to={`/tour/${tour._id}`}
                className="group bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
              >
                <div className="h-56 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200"
                    alt={tour.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-1">{tour.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {tour.summary}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-900 font-bold">₹ {tour.price}</p>

                    <p className="text-yellow-500 font-medium">
                      ⭐ {tour.ratingsAverage}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
