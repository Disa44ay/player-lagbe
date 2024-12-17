import React, { useContext} from "react";
import "./Item.css";
import { assets } from "../../assets/assets";
import { Storecontext } from "../../Context/StoreContext";

const Item = ({ id, name, price, description, image }) => {
  const {cartItems,addToCart,removeFromCart}= useContext(Storecontext)

  return (
    <div className="item">
      <div className="item-image-container">
        <img src={image} alt="" className="item-image" />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.icon_plus_b_bg_gif}
            alt=""
          />
        ) : (
          <div className="item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.icon_minus_t_bg}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.icon_plus_t_bg}
              alt=""
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

