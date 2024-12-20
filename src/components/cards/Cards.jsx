import React, { useState, useEffect } from "react";
import "./Cards.css"; // Make sure to include your CSS
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const [resourceType, setResourceType] = useState("donated");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [donatedResources, setDonatedResources] = useState([]);
  const [requestedResources, setRequestedResources] = useState([]);
  const [requestMessage, setRequestMessage] = useState("");
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("user_id");

  // Fetch donated resources from server
  useEffect(() => {
    const fetchDonatedResources = async () => {
      try {
        const response = await fetch("http://localhost:5000/donatedResources"); // Adjust URL if needed
        const data = await response.json();
        setDonatedResources(data);
      } catch (error) {
        console.error("Error fetching donated resources:", error);
      }
    };

    fetchDonatedResources();
  }, []);

  // Fetch requested resources from server
  useEffect(() => {
    const fetchRequestedResources = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/requestedResources"
        ); // Adjust URL if needed
        const data = await response.json();
        setRequestedResources(data);
      } catch (error) {
        console.error("Error fetching requested resources:", error);
      }
    };

    fetchRequestedResources();
  }, []);

  // Request resource function
  const handleRequestResource = async (resourceId) => {
    try {
      const token = localStorage.getItem("authToken"); // JWT token for authentication
      const response = await fetch(
        `http://localhost:5000/request-resource/${resourceId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedResources = donatedResources.map((resource) =>
          resource._id === resourceId
            ? {
                ...resource,
                requestedBy: [
                  ...resource.requestedBy,
                  { userId: currentUserId },
                ],
              }
            : resource
        );
        setDonatedResources(updatedResources);
        setRequestMessage("Resource requested successfully.");
      } else {
        setRequestMessage("Failed to request the resource.");
      }
    } catch (error) {
      console.error("Error requesting resource:", error);
      setRequestMessage("An error occurred while requesting the resource.");
    }
  };

  // Handle navigating to chat page
  const handleChat = (resourceId) => {
    navigate(`/chat`); // Navigate to chat page with the resource ID
  };

  // Filter resources based on category for donated resources
  const filteredDonatedResources =
    categoryFilter === "all"
      ? donatedResources
      : donatedResources.filter(
          (resource) => resource.category === categoryFilter
        );

  return (
    <div className="cards-section">
      <div className="dropdown">
        <select
          value={resourceType}
          onChange={(e) => setResourceType(e.target.value)}
        >
          <option value="donated">Donated Resources</option>
          <option value="requested">Requested Resources</option>
        </select>
      </div>

      {/* Show Donated Resources */}
      {resourceType === "donated" && (
        <>
          <div className="dropdown">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="food">Food</option>
              <option value="clothes">Clothes</option>
              <option value="education">Education</option>
            </select>
          </div>

          <div className="card-container">
            {filteredDonatedResources.length > 0 ? (
              filteredDonatedResources.map((resource) => {
                const isRequestedByCurrentUser = resource.requestedBy.some(
                  (request) => request.userId === currentUserId
                );

                return (
                  <div key={resource._id} className="card">
                    <img
                      src={`http://localhost:5000${resource.image[0]}`}
                      alt={resource.resourceName}
                      className="card-image"
                    />
                    <h3>{resource.resourceName}</h3>
                    <p className="resource-quantity">
                      Quantity: {resource.quantity}
                    </p>
                    <p className="resource-description">
                      Description : {resource.description}
                    </p>
                    <p className="resource-location">
                      Location: {resource.location}
                    </p>
                    <p className="resource-by">
                      Donated By : {resource.userId.name}
                    </p>

                    {isRequestedByCurrentUser ? (
                      <>
                        <button
                          className="requested-button"
                          disabled
                          style={{ marginRight: "10px" }}
                        >
                          Requested
                        </button>
                        <button
                          className="chat-button"
                          onClick={() => handleChat(resource._id)}
                        >
                          Chat
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleRequestResource(resource._id)}
                        className="request-button"
                      >
                        Request
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <p>No donated resources available.</p>
            )}
          </div>
          {requestMessage && (
            <p className="request-message">{requestMessage}</p>
          )}
        </>
      )}
    </div>
  );
};

export default Cards;
