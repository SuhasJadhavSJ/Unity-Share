import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const navigate = useNavigate(); // Use useNavigate hook
  const userRole = localStorage.getItem('userRole');

  if (userRole !== 'admin') {
    // Redirect to login if not an admin
    navigate('/admin-login', { replace: true });
    return null; // Return nothing while redirecting
  }

  return <Route {...rest} element={<Component />} />;
};

export default ProtectedRoute;
