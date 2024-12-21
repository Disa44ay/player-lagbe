import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const Storecontext = createContext(null);

// Context Provider Component
export const StorecontextProvider = ({ children }) => {  // Use `export` for named export
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const url = "http://localhost:4000";
  const [item_list, setItemList] = useState([]);

  const addToCart = (itemID) => {
    setCartItems((prev) => ({
      ...prev,
      [itemID]: (prev[itemID] || 0) + 1,
    }));
  };

  const removeFromCart = (itemID) => {
    if (cartItems?.[itemID] > 1) {
      setCartItems((prev) => ({
        ...prev,
        [itemID]: prev[itemID] - 1,
      }));
    } else {
      const { [itemID]: _, ...rest } = cartItems;
      setCartItems(rest);
    }
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItems || {}).reduce((total, [itemID, qty]) => {
      const itemInfo = item_list.find((product) => product._id === itemID);
      return total + (itemInfo?.price || 0) * qty;
    }, 0);
  };

  const fetchItemList = async () => {
    try {
      const response = await axios.get(`${url}/api/item/list`);
      setItemList(response.data.data);
    } catch (error) {
      console.error("Error fetching item list:", error);
      setItemList([]); // Default to an empty list
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchItemList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    };
    loadData();
  }, []);

  const contextValue = {
    item_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <Storecontext.Provider value={contextValue}>
      {children}
    </Storecontext.Provider>
  );
};
