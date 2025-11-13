import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Hello, {user?.name}</h1>
      <p className="text-gray-600">Your email: {user?.email}</p>
    </div>
  );
}
