// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../auth/firebase';
import './ProtectedRoute.css';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="spinner-container">
        Loading...
        <div className="spinner"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
