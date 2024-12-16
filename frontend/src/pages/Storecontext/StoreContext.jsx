import React, { createContext, useContext, useState } from "react";

// Create a context
const StoreContext = createContext();

// Custom hook for easier access to context
export const useStore = () => {
  return useContext(StoreContext);
};

// Provider component
export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  // Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item.id]: {
        ...item,
        quantity: (prevCart[item.id]?.quantity || 0) + 1,
      },
    }));
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[itemId]) {
        if (updatedCart[itemId].quantity > 1) {
          updatedCart[itemId].quantity -= 1;
        } else {
          delete updatedCart[itemId];
        }
      }
      return updatedCart;
    });
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return Object.values(cart).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Calculate total items in cart
  const calculateTotalItems = () => {
    return Object.values(cart).reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        calculateTotalPrice,
        calculateTotalItems,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
