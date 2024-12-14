import "./Navbar.css";
import { assets } from "../../assets/assets";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("Teams");

    return (
        <div className="navbar">
            <Link to="/">
                <img src={assets.logo_new_t_bg} className="logo" alt="Logo" />
            </Link>
            <ul className="navbar-menu">
                <li 
                    onClick={() => setMenu("Teams")} 
                    className={menu === "Teams" ? "active" : ""}
                >
                    <Link to="/teams">Teams</Link>
                </li>
                <li 
                    onClick={() => setMenu("Shop")} 
                    className={menu === "Shop" ? "active" : ""}
                >
                    <Link to="/shop">Shop</Link>
                </li>
                <li 
                    onClick={() => setMenu("Profile")} 
                    className={menu === "Profile" ? "active" : ""}
                >
                    <Link to="/profile">Profile</Link>
                </li>
            </ul>

            <div className="navbar-right">
                <div className="navbar-search-icon">
                    <img src={assets.icon_cart} alt="Cart Icon" />
                    <div className="dot"></div>
                </div>
                <button onClick={() => setShowLogin(true)}>Sign-in</button>
            </div>
        </div>
    );
};

export default Navbar;
