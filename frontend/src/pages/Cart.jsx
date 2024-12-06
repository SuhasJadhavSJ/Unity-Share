// import React, { useState } from 'react';
// import './Cart.css';

// function Cart() {
//   // Sample cart items (replace with actual data from state/context/props or API)
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       title: 'Textbook on Physics',
//       description: 'A comprehensive guide to Physics for high school students.',
//       image: 'https://via.placeholder.com/150',
//     },
//     {
//       id: 2,
//       title: 'Mathematics Workbook',
//       description: 'Workbook with practice questions for mathematics.',
//       image: 'https://via.placeholder.com/150',
//     },
//     {
//       id: 3,
//       title: 'Science Experiment Kit',
//       description: 'Kit with materials and instructions for basic science experiments.',
//       image: 'https://via.placeholder.com/150',
//     },
//   ]);

//   // Function to remove item from the cart
//   const removeItem = (id) => {
//     const updatedCart = cartItems.filter(item => item.id !== id);
//     setCartItems(updatedCart);
//   };

//   return (
//     <div className="cart-page">
//       <h1>Your Cart</h1>
//       {cartItems.length > 0 ? (
//         <div className="cart-items">
//           {cartItems.map((item) => (
//             <div key={item.id} className="cart-item">
//               <img src={item.image} alt={item.title} className="cart-item-image" />
//               <div className="cart-item-details">
//                 <h2 className="cart-item-title">{item.title}</h2>
//                 <p className="cart-item-description">{item.description}</p>
//               </div>
//               <button className="remove-button" onClick={() => removeItem(item.id)}>Remove</button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//     </div>
//   );
// }

// export default Cart;

import React from 'react'
import ShowCart from '../components/showCart/ShowCart'

const Cart = () => {
  return (
    <div>
      <ShowCart/>
    </div>
  )
}

export default Cart
