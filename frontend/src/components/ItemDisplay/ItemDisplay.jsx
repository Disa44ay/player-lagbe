import React, { useContext } from "react";
import "./Itemdisplay.css";
import { Storecontext } from "../../Context/StoreContext";
import Item from "../Item/Item";

const ItemDisplay = ({ category }) => {
  const { item_list } = useContext(Storecontext);

  return (
    <div className="item-display" id="item-display">
      <p>Taking the sport accessories little closer to your doorstep</p>
      <div className="item-display-list">
        {item_list.map((item, index) => {
          if ((category === "All" || category === item.category)) {
            return (
              <Item
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ItemDisplay;
