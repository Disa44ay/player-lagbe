import React, { useState } from 'react';
import './ItemDisplay.css';
import { assets } from '../../assets/assets';

const ItemDisplay = ({ items, selectedCategory }) => {
  const [quantities, setQuantities] = useState(
    items.reduce((acc, item) => ({ ...acc, [item._id]: 1 }), {})
  );

  const handleIncrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(prev[id] - 1, 1) }));
  };

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const groupedItems = selectedCategory === 'All' 
    ? items.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      }, {})
    : { [selectedCategory]: filteredItems };

  return (
    <div className="item-display">
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <div key={category} className="item-category-section">
          <h2 className="item-category-title">{category}</h2>
          <div className="item-grid">
            {categoryItems.map((item) => (
              <div key={item._id} className="item-card">
                <img src={item.image} alt={item.name} className="item-image" />
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">Price: ${item.price}</p>
                <p className="item-description">{item.description}</p>
                <div className="item-actions">
                  <button className="item-button">Add to Cart</button>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleDecrement(item._id)}
                    >
                      -
                    </button>
                    <span className="quantity">{quantities[item._id]}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleIncrement(item._id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemDisplay;
