// ⚡ APP.JS - The Main Reactor Core
// File Location: src/App.js
// Updated with auth routes and initialization

import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeAuth } from './services/auth-service';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './pages/Signup';
import JobTracked from './pages/JobTracked';
import JobTrackerMain from './pages/JobTrackerMain';
import Features from './pages/Features';
import About from './pages/About';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  // Initialize auth on app start
  useEffect(() => {
    const init = async () => {
      await initializeAuth();
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#0f172a',
        color: 'white',
        fontSize: '1.5rem',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div className="spinner" style={{ marginRight: '15px' }}></div>
        Initializing...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Landing Page (JobTracked) - Always accessible */}
        <Route path="/" element={<JobTracked />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />

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
