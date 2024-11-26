// components/LoginPrompt.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPrompt from './LoginPrompt.css'

const LoginPrompt = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    onClose();
    navigate('/login'); // Redirects to the login page
  };

  return (
    <div className="login-prompt-overlay">
      <div className="login-prompt">
        <p>You need to log in to access this feature.</p>
        <button onClick={handleLoginRedirect}>Go to Login</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default LoginPrompt;
