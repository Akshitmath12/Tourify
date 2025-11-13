import { useState } from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import './App.css'
import {AuthProvider} from "./context/AuthContext";

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TourDetails from './pages/TourDetails.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Header from "./components/Header.jsx";


function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />}/>
        <Route path= '/tour/:id' element={<TourDetails />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={
                        <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
        
        } />
      <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
