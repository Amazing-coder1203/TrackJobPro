// ⚡ APP.JS - The Main Reactor Core
// File Location: src/App.js
// Updated with auth routes and initialization

import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeAuth } from './services/auth-service';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './pages/Signup';
import JobTracked from './pages/JobTracked';
import JobTrackerMain from './pages/JobTrackerMain';
import './App.css';

function App() {
  // Initialize auth on app start
  useEffect(() => {
    initializeAuth();
    // Optional: Create demo account if it doesn't exist
    createDemoAccount();
  }, []);

  // Helper function to create a demo account
  const createDemoAccount = () => {
    const users = JSON.parse(localStorage.getItem('job_tracker_users')) || [];
    const demoExists = users.some(u => u.email === 'demo@example.com');

    if (!demoExists) {
      const demoUser = {
        id: Date.now(),
        email: 'demo@example.com',
        password: 'demo123',
        name: 'Demo User',
        createdAt: new Date().toISOString(),
        jobApplications: []
      };
      users.push(demoUser);
      localStorage.setItem('job_tracker_users', JSON.stringify(users));
    }
  };

  return (
    <Router>
      <Routes>
        {/* Landing Page (JobTracked) - Always accessible */}
        <Route path="/" element={<JobTracked />} />

        {/* Login/Signup Page */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signup />} />

        {/* Protected Tracker Page - Only if logged in */}
        <Route
          path="/tracker"
          element={
            <ProtectedRoute>
              <JobTrackerMain />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
