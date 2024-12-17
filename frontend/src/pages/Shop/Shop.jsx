import React, { useState } from "react";
import "./Shop.css";
import Menu from "../../components/Menu/Menu";
import ItemDisplay from "../../components/ItemDisplay/ItemDisplay";

const Shop = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>
      <Menu category = {category} setCategory = {setCategory} />
      <ItemDisplay category = {category} />
    </div>
  );
};

export default Shop;
