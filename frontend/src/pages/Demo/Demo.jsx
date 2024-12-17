import React, { useState } from "react";
import "./Demo.css";
import DemoMenu from "../../components/Demomenu/DemoMenu";
import DemoItemDisplay from "../../components/DemoItemdisplay/DemoItemDisplay";

const Demo = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>
      <DemoMenu category = {category} setCategory = {setCategory} />
      <DemoItemDisplay category = {category} />
    </div>
  );
};

export default Demo;
