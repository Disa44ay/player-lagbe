import React, { useState } from "react";
import "./DemoItem.css";
import { assets } from "../../assets/assets";

const DemoItem = ({ id, name, price, description, image }) => {
  const [itemCount, setItemCount] = useState(0);
  return (
    <div className="item">
      <div className="item-image-container">
        <img src={image} alt="" className="item-image" />
        {!itemCount ? (
          <img
            className="add"
            onClick={() => setItemCount((prev) => prev + 1)}
            src={assets.icon_plus_b_bg_gif}
            alt=""
          />
        ) : (
          <div className="item-counter">
            <img
              onClick={() => setItemCount((prev) => prev - 1)}
              src={assets.icon_minus_t_bg}
              alt=""
            />
            <p>{itemCount}</p>
            <img
              onClick={() => setItemCount((prev) => prev + 1)}
              src={assets.icon_plus_t_bg}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="item-info">
        <p>{name}</p>
        <p className="item-description">{description}</p>
        <p className="item-price">৳{price}</p>
      </div>
    </div>
  );
};

export default DemoItem;
