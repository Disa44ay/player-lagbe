import React, { useContext } from "react";
import "./ItemDisplay.css"
import { Storecontext } from "../../Context/StoreContext";
import Item from "../Item/Item";

const ItemDisplay = ({ category }) => {
  const { item_list } = useContext(Storecontext);

  // Log the category and item_list for debugging
  console.log("Selected Category:", category);
  console.log("Item List:", item_list);

  // Normalize the category for consistent comparison (case-insensitive and replace spaces/hyphens)
  const normalizeCategory = (cat) => cat.toLowerCase().replace(" ", "-");

  const filteredItems = item_list?.filter((item) => {
    const itemCategory = normalizeCategory(item.category);
    const selectedCategory = normalizeCategory(category);
    console.log("Item Category:", itemCategory);
    console.log("Selected Category:", selectedCategory);
    return selectedCategory === "all" || itemCategory === selectedCategory;
  });

  console.log("Filtered Items:", filteredItems); // Debugging filtered items

  return (
    <div className="item-display" id="item-display">
      <p>Taking the sport accessories a little closer to your doorstep</p>
      <div className="item-display-list">
        {filteredItems?.length > 0 ? (
          filteredItems.map((item) => (
            <Item
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image} // Let Item handle the URL
            />
          ))
        ) : (
          <p>No items available for the selected category.</p>
        )}
      </div>
    </div>
  );
};

export default ItemDisplay;
