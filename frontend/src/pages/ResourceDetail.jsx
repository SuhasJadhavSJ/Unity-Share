import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ResourceDetails = () => {
  const { id } = useParams(); // Get the resource ID from the URL params
  const [resource, setResource] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResourceDetails = async () => {
      try {
        console.log(`Fetching resource with ID: ${id}`); // Log the ID for debugging
        const response = await fetch(`http://localhost:5000/donatedResources/${id}`); // Backend endpoint to fetch a single resource
        if (!response.ok) {
          throw new Error("Failed to fetch resource details");
        }
        const data = await response.json();
        console.log("Fetched resource data:", data); // Log the fetched data
        setResource(data); // Set the fetched resource data
      } catch (error) {
        console.error("Error fetching resource details:", error);
        setError(error.message);
      }
    };

    fetchResourceDetails();
  }, [id]); // Fetch resource details when the ID changes

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!resource) {
    return <p>Loading resource details...</p>;
  }

  return (
    <div className="resource-details-container">
      <h2>{resource.resourceName}</h2>
      <img src={`http://localhost:5000${resource.image}`} alt={resource.resourceName} />
      <p><strong>Category:</strong> {resource.category}</p>
      <p><strong>Description:</strong> {resource.description}</p>
      <p><strong>Quantity:</strong> {resource.quantity}</p>
      <p><strong>Location:</strong> {resource.location}</p>
      <p><strong>Donor:</strong> {resource.donorName}</p>
      <p><strong>Custom Category:</strong> {resource.customCategory}</p>
      <button className="request-button">Request this Resource</button>
    </div>
  );
};

export default ResourceDetails;
