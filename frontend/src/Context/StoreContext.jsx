import { createContext, useEffect, useState } from "react";
import { item_list } from "../assets/assets";

export const Storecontext = createContext(null);

const StorecontextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemID) => {
    if (!cartItems[itemID]) {
      setCartItems((prev) => ({ ...prev, [itemID]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }));
    }
  };

  const removeFromCart = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] - 1 }));
  };

  const getTotalCartAmount = () =>{
    let TotalAmount = 0;
    for(const item in cartItems)
    {
      if(cartItems[item] > 0){
      let itemInfo = item_list.find((product)=> product._id === item);
      TotalAmount += itemInfo.price * cartItems[item];
      }
    }
    return TotalAmount;
  }

  const contextValue = {
    item_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  };

  return (
    <Storecontext.Provider value={contextValue}>
      {props.children}
    </Storecontext.Provider>
  );
};

export default StorecontextProvider;
