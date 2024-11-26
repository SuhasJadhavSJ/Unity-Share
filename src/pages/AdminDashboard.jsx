// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AdmiDashboard.css';

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [resources, setResources] = useState([]);
//   const [users, setUsers] = useState([]);
  
//   // This function fetches the resources and users (assuming from an API)
//   useEffect(() => {
//     // Fetch the resources (replace with actual API call)
//     // Example of resources data (this should be fetched from your backend)
//     setResources([
//       {
//         id: 1,
//         name: 'Winter Jacket',
//         category: 'Clothes',
//         description: 'A warm winter jacket for cold weather',
//         image: 'https://example.com/images/jacket.jpg',  // replace with actual image URL
//       },
//       {
//         id: 2,
//         name: 'Running Shoes',
//         category: 'Footwear',
//         description: 'Comfortable running shoes for sports',
//         image: 'https://example.com/images/shoes.jpg',  // replace with actual image URL
//       },
//       // Add more resource objects here
//     ]);
    
//     // Example of users data (this should also come from your backend)
//     setUsers([
//       { id: 1, name: 'John Doe' },
//       { id: 2, name: 'Jane Smith' },
//       // Add more users here
//     ]);
//   }, []);

//   // Handle removing a resource
//   const handleRemoveResource = (id) => {
//     // Remove the resource (replace with your backend logic)
//     setResources(resources.filter(resource => resource.id !== id));
//   };

//   // Handle removing a user
//   const handleRemoveUser = (id) => {
//     // Remove the user (replace with your backend logic)
//     setUsers(users.filter(user => user.id !== id));
//   };

//   return (
//     <div className="admin-dashboard">
//       <h2>Admin Dashboard</h2>

//       {/* Display resources */}
//       <h3>Donated Resources</h3>
//       <div className="card-container">
//         {resources.map((resource) => (
//           <div key={resource.id} className="card">
//             <img src={resource.image} alt={resource.name} />
//             <p><strong>Name:</strong> {resource.name}</p>
//             <p><strong>Category:</strong> {resource.category}</p>
//             <p><strong>Description:</strong> {resource.description}</p>
//             <button onClick={() => handleRemoveResource(resource.id)}>
//               Remove Resource
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Display users */}
//       <h3>Registered Users</h3>
//       <div className="users">
//         {users.map((user) => (
//           <div key={user.id}>
//             <p>{user.name}</p>
//             <button onClick={() => handleRemoveUser(user.id)}>
//               Remove User
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdmiDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [users, setUsers] = useState([]);

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

      {/* Display users */}
      <h3>Registered Users</h3>
      <div className="users">
        {users.map((user) => (
          <div key={user._id}>
            <p>{user.name}</p>
            <button onClick={() => handleRemoveUser(user._id)}>
              Remove User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
