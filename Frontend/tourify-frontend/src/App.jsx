import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TourDetails from "./pages/TourDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Header from "./components/Header";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTours from "./pages/admin/AdminTours";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Header /> 

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tour/:id" element={<TourDetails />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route 
          path="/admin"

          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
/>

<Route path = "/admin/tours" 
element={
  <AdminRoute>
    <AdminTours />
  </AdminRoute>
}
/>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;
