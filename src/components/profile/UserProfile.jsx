import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting to login page
import ProfileEdit from '../profileEdit/ProfileEdit';
import './UserProfile.css';

function UserProfile() {
  const [user, setUser] = useState({
    name: '', // Default name will be empty until fetched
  });
  const [requestedResources, setRequestedResources] = useState([]);
  const [donatedResources, setDonatedResources] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const userId = localStorage.getItem('user_id');
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate(); // For redirecting to login page

  useEffect(() => {
    if (!authToken || !userId) {
      console.error("Missing auth token or user ID");
      navigate('/login'); // Redirect to login if no token or user ID
      return;
    }

    fetchUserData();
  }, [userId, authToken, navigate]); // Re-fetch when userId or authToken changes

  const fetchUserData = async () => {
    setIsLoading(true); // Set loading to true at the start
    try {
      const response = await fetch(`http://localhost:5000/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      } else {
        const data = await response.json();
        console.log("Fetched user data:", data); // Log the full response here

        const userName = data.name && typeof data.name === 'object' ? data.name.name : data.name; // Access 'name' inside the object if it's an object
        
        setUser({
          name: userName || 'Unknown User', // Set the name correctly or fallback to 'Unknown User'
        });
        setDonatedResources(data.donatedResources || []);
        setRequestedResources(data.requestedResources || []);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false); // Ensure loading is false after fetching
    }
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    setIsEditModalOpen(false);
  };

  if (isLoading) {
    return <div className="loading">Loading profile...</div>; // Show loading state
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src="default-profile-pic.jpg" // Default image
          alt="Profile"
          className="profile-pic"
        />
        <div className="profile-info">
          <h1>{user.name}</h1> {/* Now safely renders the full name */}
          <button onClick={openEditModal} className="edit-profile-button">
            Edit Profile
          </button>
        </div>
      </div>

      <div className="resources-section">
        <h2>Requested Resources</h2>
        <div className="resource-list">
          {requestedResources.length > 0 ? (
            requestedResources.map((resource) => (
              <div key={resource._id} className="resource-item">
                <img
                  src={`http://localhost:5000${resource.image || 'placeholder-image.jpg'}`} 
                  alt={resource.resourceName}
                  className="resource-image"
                />
                <p>Resource Name: {resource.resourceName}</p>
                <p>Quantity: {resource.quantity}</p>
                <p>Location: {resource.location}</p>
              </div>
            ))
          ) : (
            <p>No requested resources found.</p>
          )}
        </div>
      </div>

      <div className="resources-section">
        <h2>Donated Resources</h2>
        <div className="resource-list">
          {donatedResources.length > 0 ? (
            donatedResources.map((resource) => (
              <div key={resource._id} className="resource-item">
                <img 
                  src={`http://localhost:5000${resource.image[0]}`} 
                  alt={resource.resourceName} 
                  className="resource-image" 
                />
                <p>Resource Name: {resource.resourceName}</p>
                <p>Quantity: {resource.quantity}</p>
                <p>Category: {resource.category}</p>
                <p>Location: {resource.location}</p>
              </div>
            ))
          ) : (
            <p>No donated resources found.</p>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <ProfileEdit user={user} onUpdateUser={handleUpdateUser} onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
}

export default UserProfile;
