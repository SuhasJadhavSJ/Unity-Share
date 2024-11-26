import React, { useState } from "react";
import "./ShowCart.css";

const ShowCart = () => {

  const [cartItems, setCartItems] = useState([
    // Example items in the cart (you can fetch this from a backend)
    {
      id: 1,
      name: "Winter Jacket",
      category: "Clothes",
      description: "A warm winter jacket for cold weather",
    },
    {
      id: 2,
      name: "School Books",
      category: "Education",
      description: "Mathematics and Science books for grade 10",
    },
  ]);

  const handleRemoveItem = (id) => {
    // Show confirmation dialog
    const confirmRemove = window.confirm("Are you sure you want to remove this item from the cart?");
    
    // If the user confirms, remove the item
    if (confirmRemove) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    }
  };

  const handleProceedToRequest = () => {
    // Handle the logic when user proceeds to request the items
    alert("Proceeding with the request for the items.");
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add resources to request them.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <h3>{item.name}</h3>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <button
                className="remove-btn"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <button className="proceed-btn" onClick={handleProceedToRequest}>
          Proceed to Request
        </button>
      )}
    </div>
  );
};

export default ShowCart;


// import React, { useEffect, useState } from "react";
// import "./ShowCart.css";

// const ShowCart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true); // To manage loading state
//   const [error, setError] = useState(null); // To manage error state

//   useEffect(() => {
//     // Fetch requested resources for the logged-in user
//     const fetchRequestedResources = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("Token not found");
//         }
    
//         const response = await fetch("/user-requested-resources", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
    
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
    
//         const data = await response.json();
//         console.log("API working:", data);
//         setCartItems(data.requests || []);
//       } catch (err) {
//         console.error("Error fetching requested resources:", err);
//         setError(err.message || "Failed to fetch resources. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
    

//     fetchRequestedResources();
//   }, []);

//   const handleRemoveItem = async (id) => {
//     const confirmRemove = window.confirm(
//       "Are you sure you want to remove this item from the cart?"
//     );
//     if (confirmRemove) {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(`/user-requested-resources/${id}`, {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
//       } catch (err) {
//         console.error("Error removing item:", err);
//         alert("Failed to remove item. Please try again.");
//       }
//     }
//   };

//   if (loading) {
//     return <p>Loading your requested resources...</p>;
//   }

//   if (error) {
//     return <p className="error">{error}</p>;
//   }

//   return (
//     <div className="cart-page">
//       <h2>Your Requested Resources</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty. Add resources to request them.</p>
//       ) : (
//         <div className="cart-items">
//           {cartItems.map((item) => (
//             <div className="cart-item" key={item._id}>
//               <h3>{item.resourceName}</h3>
//               <p>
//                 <strong>Category:</strong> {item.category}
//               </p>
//               <p>
//                 <strong>Description:</strong> {item.description}
//               </p>
//               <img src={item.image} alt={item.resourceName} />
//               <button
//                 className="remove-btn"
//                 onClick={() => handleRemoveItem(item._id)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowCart;
