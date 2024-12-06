// AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'

const AdminLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Assuming you have a hardcoded admin id and password for now
    const correctAdminId = 'Admin'; // Replace with your actual admin ID
    const correctPassword = '12345'; // Replace with your actual password

    if (adminId === correctAdminId && password === correctPassword) {
      // Store admin login state
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin-dashboard');
    } else {
      alert('Invalid Admin ID or Password');
    }
  };

  return (
    <div className="login-form">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Admin ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
