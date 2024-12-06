import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ toggleForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const user = { name, email, password };

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Signup successful! Redirecting to LoginPage...");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Signup failed, please try again.");
    }
  }; 

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" id="name" className="form-input" placeholder="Enter your name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" id="email" className="form-input" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" id="password" className="form-input" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" className="signup-btn">Sign Up</button>
      </form>

      <div className="form-switch">
        <p>Already have an account? <span className="switch-btn" onClick={toggleForm}>Login</span></p>
      </div>
    </div>
  );
};

export default Signup;
