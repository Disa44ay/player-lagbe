import "./Navbar.css";
import { assets } from "../../assets/assets";
import React, { useState } from "react"; 

const Navbar = () => {

    const[menu,setMenu] = useState("Teams");

  return (
    <div className='navbar'>
      <img src={assets.logo_new_white_t_bg} className="logo" />
      <ul className='navbar-menu'>
        <li onClick={()=>setMenu("Teams")} className={menu == "Teams"?"active":" "}>Teams</li>
        <li onClick={()=>setMenu("Shop")} className={menu == "Shop"?"active":" "}>Shop</li>
        <li onClick={()=>setMenu("Profile")} className={menu == "Profile"?"active":" "}>Profile</li>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search-icon">
          <img src={assets.icon_cart} alt="" />
          <div className="dot"></div>
          </div>
        <button>Sign-in</button>
      </div>
    </div>
  );
};

export default Navbar;
