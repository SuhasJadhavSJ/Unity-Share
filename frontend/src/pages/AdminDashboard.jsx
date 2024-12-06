import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdmiDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]); // State for storing contact form submissions

  useEffect(() => {
    // Fetch donated resources
    fetch('http://localhost:5000/donatedResources') // Update with your backend endpoint
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch((err) => console.error('Error fetching resources:', err));

    // Fetch registered users
    fetch('http://localhost:5000/users') // Update with your backend endpoint
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users:', err));

    // Fetch contact form submissions
    fetch('http://localhost:5000/contact') // Endpoint for contact form submissions
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error('Error fetching contact data:', err));
  }, []);

  // Handle removing a resource
  const handleRemoveResource = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/donatedResources/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setResources(resources.filter(resource => resource._id !== id));
      } else {
        console.error('Failed to delete resource');
      }
    } catch (err) {
      console.error('Error removing resource:', err);
    }
  };

  // Handle removing a user
  const handleRemoveUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setUsers(users.filter(user => user._id !== id));
      } else {
        console.error('Failed to delete user');
      }
    } catch (err) {
      console.error('Error removing user:', err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Display resources */}
      <h3>Donated Resources</h3>
      <div className="card-container">
        {resources.map((resource) => (
          <div key={resource._id} className="card">
            <img src={`http://localhost:5000${resource.image}`} alt={resource.name} />
            <p><strong>Name:</strong> {resource.resourceName}</p>
            <p><strong>Category:</strong> {resource.category}</p>
            <p><strong>Description:</strong> {resource.description}</p>
            <button onClick={() => handleRemoveResource(resource._id)}>
              Remove Resource
            </button>
          </div>
        ))}
      </div>

      {/* Display users in cards */}
      <h3>Registered Users</h3>
      <div className="card-container">
        {users.map((user) => (
          <div key={user._id} className="card user-card">
            <img src={user.profilePic ? `http://localhost:5000${user.profilePic}` : '/default-profile.png'} alt={user.name} />
            <p><strong>Name:</strong> {user.name}</p>
            <button onClick={() => handleRemoveUser(user._id)}>
              Remove User
            </button>
          </div>
        ))}
      </div>

      {/* Display Contact Us submissions */}
      <h3>Contact Form Submissions</h3>
      <div className="card-container">
        {contacts.map((contact) => (
          <div key={contact._id} className="card contact-card">
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Subject:</strong> {contact.subject}</p>
            <p><strong>Message:</strong> {contact.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
