// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register'
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import HealthCheck from './components/HealthCheck';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/health-check" element={<HealthCheck />} />
        {/* Protected routes */}
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />

        {/* Default route for unknown URLs */}
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
