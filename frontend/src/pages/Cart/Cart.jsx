import React from "react";
import "./Cart.css";
import { useStore } from "../Storecontext/StoreContext";

const Cart = () => {
  const { cart, removeFromCart, calculateTotalPrice } = useStore();

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {Object.keys(cart).length === 0 ? (
        <p className="cart-empty">Your cart is empty!</p>
      ) : (
        <div className="cart-items">
          {Object.values(cart).map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-details">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div>
                  <h2>{item.name}</h2>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
              <button
                className="cart-remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {Object.keys(cart).length > 0 && (
        <div className="cart-summary">
          <h2>Total Price: ${calculateTotalPrice()}</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
