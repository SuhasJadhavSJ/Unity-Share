import React, { useState, useEffect } from "react";
import "./ShowCart.css";

const ShowCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the requested resources when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const authToken = localStorage.getItem("authToken");
  
        if (!userId || !authToken) {
          console.error("User ID or Auth Token is missing");
          return;
        }
  
        const response = await fetch(`http://localhost:5000/cart?userId=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
  
        const data = await response.json();
        console.log("Fetched Cart Items:", data.cart);  // Add this to inspect the response
  
        if (data.success) {
          setCartItems(data.cart);
        } else {
          console.error("Failed to load cart items");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCartItems(); // Fetch cart items when the component mounts
  }, []);

  // Handle removing an item from the cart
  const handleRemoveItem = async (id) => {
    console.log("Item ID to remove:", id);
  
    const confirmRemove = window.confirm("Are you sure you want to remove this request?");
    if (confirmRemove) {
      try {
        const userId = localStorage.getItem("user_id"); // Retrieve userId from localStorage
        const authToken = localStorage.getItem("authToken");
  
        if (!userId || !authToken) {
          console.error("User ID or Auth Token is missing.");
          return;
        }
  
        const response = await fetch(`http://localhost:5000/cart/remove/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
          body: JSON.stringify({ userId }), // Add the userId to the request body
        });
  
        const data = await response.json();
        if (!response.ok) {
          console.error("Failed to remove item:", data.message);
          throw new Error("Failed to remove item from cart");
        }
  
        console.log("Item removed:", data.message);
        setCartItems(cartItems.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error removing item:", error);
      }
    }
  };
  
  
  
  

  // Render the cart page
  if (loading) {
    return <p>Loading your cart...</p>;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add resources to request them.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <img
                src={
                  item.image && item.image.length > 0
                    ? `http://localhost:5000${item.image[0]}` // Direct URL for development
                    : "/path/to/default-image.jpg"
                }
                alt={item.resourceName}
                className="cart-item-image"
              />
              <h3>{item.resourceName}</h3>
              <p><strong>Donor:</strong> {item.donorName}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Requested On:</strong> {new Date(item.requestDate).toLocaleString()}</p>
              <button
                className="remove-btn"
                onClick={() => handleRemoveItem(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowCart;
