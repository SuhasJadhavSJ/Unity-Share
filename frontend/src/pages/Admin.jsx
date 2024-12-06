import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [resources, setResources] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch resources and users (you can replace this with actual API calls)
  useEffect(() => {
    // Example data for resources (including image URLs)
    setResources([
      { 
        id: 1, 
        name: 'Winter Jacket', 
        category: 'Clothes', 
        donatedBy: 'John Doe', 
        imageUrl: 'https://example.com/images/winter-jacket.jpg' 
      },
      { 
        id: 2, 
        name: 'Math Book', 
        category: 'Education', 
        donatedBy: 'Jane Doe', 
        imageUrl: 'https://example.com/images/math-book.jpg' 
      }
    ]);
    
    // Example data for users
    setUsers([
      { id: 1, username: 'JohnDoe', email: 'john@example.com' },
      { id: 2, username: 'JaneDoe', email: 'jane@example.com' },
    ]);
  }, []);

  // Function to remove resource
  const removeResource = (id) => {
    // Call backend to remove resource
    setResources(resources.filter(resource => resource.id !== id));
  };

  // Function to remove user account
  const removeUser = (id) => {
    // Call backend to remove user account
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      
      <h2>Donated Resources</h2>
      <div className="resource-list">
        {resources.length > 0 ? (
          resources.map((resource) => (
            <div key={resource.id} className="resource-item">
              <h3>{resource.name}</h3>
              <img src={resource.imageUrl} alt={resource.name} className="resource-image" />
              <p><strong>Category:</strong> {resource.category}</p>
              <p><strong>Donated by:</strong> {resource.donatedBy}</p>
              <button onClick={() => removeResource(resource.id)}>Remove Resource</button>
            </div>
          ))
        ) : (
          <p>No resources available.</p>
        )}
      </div>

      <h2>Registered Users</h2>
      <div className="user-list">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="user-item">
              <h3>{user.username}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <button onClick={() => removeUser(user.id)}>Remove User</button>
            </div>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
