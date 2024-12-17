import React, { useContext } from "react";
import "./DemoItemdisplay.css";
import { DemoStorecontext } from "../../DemoContext/DemoStoreContext";
import DemoItem from "../DemoItem/DemoItem";

const DemoItemDisplay = ({ category }) => {
  const { item_list } = useContext(DemoStorecontext);

  return (
    <div className="item-display" id="item-display">
      <h2>Taking the sport accessories a little closer to your doorstep</h2>
      <div className="item-display-list">
        {item_list.map((item, index) => {
          return (
            <DemoItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DemoItemDisplay;
