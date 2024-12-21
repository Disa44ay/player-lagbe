import React, { useContext } from "react";
import "./Item.css";
import { assets } from "../../assets/assets";
import { Storecontext } from "../../Context/StoreContext";

const Item = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(Storecontext);

  const getImageUrl = (image) => `${url}/images/${image}`; // Utility function for image URLs

  return (
    <div className="item">
      <div className="item-image-container">
        <img
          src={getImageUrl(image)}
          alt={name}
          className="item-image"
          onError={(e) => (e.target.src = assets.default_image)} // Fallback for missing images
        />
        {!cartItems?.[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.icon_plus_b_bg_gif}
            alt="Add to cart"
          />
        ) : (
          <div className="item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.icon_minus_t_bg}
              alt="Remove from cart"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.icon_plus_t_bg}
              alt="Add more to cart"
            />
          </div>
        )}
      </div>
      <div className="item-info">
        <p>{name}</p>
        <p className="item-description">{description}</p>
        <p className="item-price">${price}</p>
      </div>
    </div>
  );
};

export default Item;
