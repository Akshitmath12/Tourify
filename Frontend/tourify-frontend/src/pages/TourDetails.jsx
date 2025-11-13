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
  }, []);

  if (!tour) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{tour.name}</h1>
      <p className="text-gray-600">{tour.summary}</p>
    </div>
  );
}
