import React from "react";
import "./Menu.css";
import { menu_list } from "../../assets/assets";

const Menu = ({ category, setCategory }) => {
  return (
    <div className='menu-container' id='menu-container'>
      <h1>Explore Our Items</h1>
      <p>Menu will be updated based on your feedback</p>
      <div className='menu-items'>
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className={`menu-item ${
                category === item.menu_name ? "active" : ""
              }`}
            >
              <img src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
