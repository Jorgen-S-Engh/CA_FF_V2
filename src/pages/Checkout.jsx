// pages/Checkout.jsx
import React from "react";
import { cartStore } from "../cartStore";

function Checkout() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    cartStore((state) => ({
      cartItems: state.cartItems,
      increaseQuantity: state.increaseQuantity,
      decreaseQuantity: state.decreaseQuantity,
      removeFromCart: state.removeFromCart,
    }));

  const cartItemCount = cartStore((state) => state.cartItemCount()); // Get total number of items

  return (
    <div>
      <h1>Checkout</h1>
      <p>Total Items in Cart: {cartItemCount}</p>{" "}
      {/* Display total number of items */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} style={{ marginBottom: "20px" }}>
            <h3>{item.title}</h3>
            <p>Price: {item.price} NOK</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => decreaseQuantity(item.id)}>-</button>{" "}
            {/* Decrease quantity button */}
            <button onClick={() => increaseQuantity(item.id)}>+</button>{" "}
            {/* Increase quantity button */}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>{" "}
            {/* Remove item button */}
          </div>
        ))
      )}
    </div>
  );
}

export default Checkout;
