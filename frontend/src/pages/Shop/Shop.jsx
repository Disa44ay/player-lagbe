import React from 'react'
import './Shop.css'
import { item_list } from '../../assets/assets';


const Shop = () => {
  return (
    <div className="menu-list" id="menu-list">
      <h1>Explore our items..</h1>
      <p className="menu-list-text">
        We will update our products list based on your response.
      </p>
      <div className="menu-list-display">
        {item_list.map((item,index) => {
          return (
          <div key={index} className="menu-list-items">
            <img src={item.item_image} alt="" />
            <p>{item.item_name}</p>
          </div>
          )
        })}
      </div>

      <hr />
    </div>
  );
};

export default Shop
