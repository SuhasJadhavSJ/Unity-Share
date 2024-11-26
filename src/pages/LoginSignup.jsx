import React from 'react'
// import LoginSignup from '../components/loginSignup/LoginSignup'
import Login from '../components/loginSignup/Login.jsx';
import Signup from '../components/loginSignup/Signup.jsx';
import { useState } from 'react';
import './LoginSignup.css'

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false); // State to track if the login form is active

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between login and signup
  };

  

  return (
    <div className="loginSignup-container">
    <div className="form-toggle">
      {isLogin ? <Login toggleForm={() => setIsLogin(false)} /> : <Signup toggleForm={() => setIsLogin(true)} />}
    </div>
  </div>
  );
};

export default LoginSignup
