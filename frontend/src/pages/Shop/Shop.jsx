import React, { useState } from "react";
import "./Shop.css";
import { menu_list, item_list } from "../../assets/assets";
import ItemDisplay from "../ItemDisplay/ItemDisplay";
import { useStore } from "../Storecontext/StoreContext";
const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart, cart, calculateTotalPrice } = useStore();

  const handleScrollToItems = (menuName) => {
    setSelectedCategory(menuName);
    const section = document.getElementById("items-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="shop-container">
      <div className="menu-list" id="menu-list">
        <h1>Explore our items..</h1>
        <p className="menu-list-text">
          We will update our products list based on your response.
        </p>
        <div className="menu-list-display">
          {menu_list.map((menu, index) => (
            <div
              key={index}
              className={`menu-list-item ${
                menu.menu_name === selectedCategory ? "active" : ""
              }`}
              onClick={() => handleScrollToItems(menu.menu_name)}
            >
              <img src={menu.menu_image} alt={menu.menu_name} />
              <p>{menu.menu_name}</p>
            </div>
          ))}
          <button
            className={`menu-list-item ${
              selectedCategory === "All" ? "active" : ""
            }`}
            onClick={() => handleScrollToItems("All")}
          >
            Show All Items
          </button>
        </div>
        <hr />
      </div>

      <div id="items-section">
        <ItemDisplay
          items={item_list}
          selectedCategory={selectedCategory}
          onAddToCart={addToCart}
        />
      </div>

      <div className="cart-section">
        <h2>Cart Summary</h2>
        {Object.values(cart).map((item) => (
          <div key={item.id} className="cart-item">
            <p>
              {item.name} x {item.quantity}
            </p>
            <p>${item.price * item.quantity}</p>
          </div>
        ))}
        <h3>Total: ${calculateTotalPrice()}</h3>
      </div>
    </div>
  );
};

export default Shop;
