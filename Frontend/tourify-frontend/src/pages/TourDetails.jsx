import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/api";

export default function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  const fetchTour = async () => {
    try {
      const res = await axios.get(`/tours/${id}`);
      setTour(res.data.data.tour);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTour();
  }, [id]);

  if (!tour) return <div className="text-center py-32 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[380px] w-full">
        <img
          src={`https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000`}
          alt={tour.name}
          className="w-full h-full object-cover brightness-75"
        />
        <h1 className="absolute bottom-6 left-6 text-4xl font-extrabold text-white drop-shadow-lg">
          {tour.name}
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">{tour.summary}</h2>

          <p className="text-gray-600 leading-relaxed">{tour.description}</p>

          <div className="bg-white shadow rounded-xl p-6 grid grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm">Duration</p>
              <p className="text-lg font-semibold">{tour.duration} days</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Max Group Size</p>
              <p className="text-lg font-semibold">{tour.maxGroupSize}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Difficulty</p>
              <p className="text-lg font-semibold capitalize">{tour.difficulty}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Ratings</p>
              <p className="text-lg font-semibold">{tour.ratingsAverage} ⭐</p>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
            {tour.reviews?.length === 0 && (
              <p className="text-gray-500">No reviews yet.</p>
            )}

            <div className="space-y-4">
              {(tour.reviews || []).map((rev) => (
                <div
                  key={rev._id}
                  className="bg-white p-4 rounded-lg shadow flex items-start gap-4"
                >
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${rev.user.name}`}
                    className="w-14 h-14 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{rev.user.name}</p>
                    <p className="text-sm text-yellow-500">{rev.rating} ⭐</p>
                    <p className="text-gray-600 mt-1">{rev.review}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section — Booking Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 sticky top-20 h-fit">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            ₹ {tour.price}
          </h3>
          <p className="text-gray-600 mb-6">Per person</p>

          <button className="w-full py-3 bg-green-600 hover:bg-green-700 transition text-white rounded-xl font-semibold shadow">
            Book Now
          </button>

          <p className="text-gray-500 text-sm text-center mt-3">
            Secure payments powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
