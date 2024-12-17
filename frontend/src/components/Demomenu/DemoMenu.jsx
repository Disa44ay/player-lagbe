import React from "react";
import "./DemoMenu.css";
import { menu_list } from "../../assets/assets";

const DemoMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Items</h1>
      <p>Menu will be updated based on your feedback</p>
      <div className="explore-menu-text">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className={`explore-menu-item ${
                category === item.menu_name ? "active" : ""
              }`}
            >
              <img src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default DemoMenu;
