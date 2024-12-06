import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header.jsx'
import Cards from '../components/cards/Cards.jsx'
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if token is present
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/"); // Redirect to login if not authenticated
    } else {
      // Optional: Fetch user data from backend using the token
      fetch("http://localhost:5000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(err => console.log("Error fetching user data:", err));
    }
  },[navigate]);
  return (
    <div>
      <Header/>
      <Cards/>
    </div>
  )
}

export default Home
