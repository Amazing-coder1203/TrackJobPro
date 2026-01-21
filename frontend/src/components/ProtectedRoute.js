// 🔐 PROTECTED ROUTE - The Security Protocol
// File Location: src/components/ProtectedRoute.js
// Checks if user is logged in before showing the page

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isUserLoggedIn } from '../services/auth-service';

const ProtectedRoute = ({ children }) => {
  if (!isUserLoggedIn()) {
    // Redirect to login if not authenticated
    return <Navigate to="/signup" replace />;
  }

  // User is logged in, show the component
  return children;
};

export default ProtectedRoute;
